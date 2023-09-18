const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path"); 
const {
  razorpayInstance,
  razorpayVerifySignature,
} = require("../helpers/razorpay.helpers");
const {
  CreateOrder,
  QueryOrderItemsByID,
  UpdateOrderById,
  BulkCreateOrderItem,
  QueryOrderByID,
  AddInitialStatusData,
  CreateOrderStatusLog,
  GenerateOrderInvoiceNo,
  QueryOrderListByUserId,
} = require("../service/order.services");
const {
  QueryCartByUserId,
  UpdateCartByUserId,
} = require("../service/cart.services");
const {
  getCurrentDateTime,
  numberToWords,
} = require("../helpers/local.helpers");
const { CreateAddress } = require("../service/address.services");
const { isID } = require("../helpers/validate.helpers");

// Define constants for address properties
const SHIPPING_ADDRESS_FIELDS = [
  "shipping_address_fname",
  "shipping_address_lname",
  "shipping_address_email",
  "shipping_address_receiver_mobile",
  "shipping_address_alternative_mobile",
  "shipping_address_apartment_suite_unit",
  "shipping_address_street_address",
  "shipping_address_city",
  "shipping_address_state",
  "shipping_address_pincode",
  "shipping_address_country",
];
const BILLING_ADDRESS_FIELDS = [
  "billing_address_fname",
  "billing_address_lname",
  "billing_address_email",
  "billing_address_receiver_mobile",
  "billing_address_alternative_mobile",
  "billing_address_apartment_suite_unit",
  "billing_address_street_address",
  "billing_address_city",
  "billing_address_state",
  "billing_address_pincode",
  "billing_address_country",
];
// Constants for success messages
const SUCCESS_MESSAGES = {
  ORDER_CREATED: "Order created successfully.", // Success message for order creation
};
// Constants for error messages
const ERROR_MESSAGES = {
  MISSING_ADDRESSES: "Shipping and Billing addresses are required.",
  SOMETHING_WENT_WRONG: "Something went wrong.",
  CART_EMPTY: "Cart Empty.",
};
// Helper function to map address properties and create the address data object
const mapAddressData = (data, fields, user_id, currentDateTime) => {
  const addressData = {};
  fields.forEach((field) => {
    addressData[
      field.replace("shipping_address_", "").replace("billing_address_", "")
    ] = data[field];
  });
  addressData.user_id = user_id;
  addressData.createdBy = user_id;
  addressData.createdAt = currentDateTime;
  return addressData;
};

const getFullOrderDetilsById = async (order_id) => {
  try {
    const orderDetails = await QueryOrderByID(order_id);
    const orderItems = await QueryOrderItemsByID(order_id);
    if (orderDetails === false || orderItems === false) {
      return false;
    }
    return {
      ...orderDetails,
      payment_request: orderDetails.payment_request
        ? JSON.parse(orderDetails.payment_request)
        : orderDetails.payment_request,
      payment_response: orderDetails.payment_response
        ? JSON.parse(orderDetails.payment_response)
        : orderDetails.payment_response,
      billing_address: JSON.parse(orderDetails.billing_address),
      shipping_address: JSON.parse(orderDetails.shipping_address),
      orderItems: orderItems,
    };
  } catch (error) {
    console.error("getFullOrderDetilsById", error);
    return false;
  }
};

const generateInvoice = async (order_id) => {
  try {
    const orderDetails = await getFullOrderDetilsById(order_id);
    if (orderDetails === false) {
      // res.send("Error.");
      return false;
    }
    // puppeteer
    const templateInvoicePath = path.join(
      __dirname,
      "..",
      "public",
      "data",
      "template",
      "invoice.html"
    );

    const orderDate = new Date(orderDetails.order_datetime).toLocaleDateString(
      "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    );

    const billingAddress = `${orderDetails.billing_address.fname} ${orderDetails.billing_address.lname}, ${orderDetails.billing_address.email} <br> ${orderDetails.billing_address.street_address}, ${orderDetails.billing_address.apartment_suite_unit} <br> ${orderDetails.billing_address.city}, ${orderDetails.billing_address.pincode}, ${orderDetails.billing_address.state}, ${orderDetails.billing_address.country}`;

    const shippingAddress = `${orderDetails.shipping_address.fname} ${orderDetails.shipping_address.lname}, ${orderDetails.shipping_address.email} <br> ${orderDetails.shipping_address.street_address}, ${orderDetails.shipping_address.apartment_suite_unit} <br> ${orderDetails.shipping_address.city}, ${orderDetails.shipping_address.pincode}, ${orderDetails.shipping_address.state}, ${orderDetails.shipping_address.country}`;

    const grandTotal = orderDetails.order_amount;
    const grandTotalInWords = numberToWords(parseFloat(grandTotal));

    let orderItems = "";
    orderDetails.orderItems.map((item, index) => {
      const percent = item.gst_percentage; // 5%
      const value = item.product_msp;
      const result = (percent / 100) * value;

      orderItems += `<tr>
                  <td>${index + 1}</td>
                  <td>${item.product_title}</td>
                  <td><img src="${
                    item.img_link
                  }?w=50&h=50" alt="Product 2" class="product-image"></td>
                  <td>${item.quantity}</td>
                  <td>Rs. ${item.product_msp - result}</td>
                  <td>Rs. 0.00</td>
                  <td>Rs. 0.00 (0.00%)</td>
                  <td>Rs. 0.00 (0.00%)</td>
                  <td>Rs. ${result} (${item.gst_percentage}%)</td>
                  <td>28.35</td>
              </tr>`;
    });

    const dynamicData = {
      orderItems,
      orderDate,
      grandTotal,
      grandTotalInWords,
      orderNumber: orderDetails.order_no,
      invoiceNumber: orderDetails.invoice_no,
      billingAddress,
      shippingAddress,
      // Add more dynamic data as needed
    };
    // launch a new chrome instance
    const browser = await puppeteer.launch({ headless: true });

    // create a new page
    const page = await browser.newPage();

    // Navigate to a blank page to clear any previous content
    await page.goto("about:blank");

    // set your html as the pages content
    const html = fs.readFileSync(`${templateInvoicePath}`, "utf8");

    const replacedHtml = html
      .replace(/{{orderItems}}/g, dynamicData.orderItems)
      .replace(/{{grandTotalInWords}}/g, dynamicData.grandTotalInWords)
      .replace(/{{grandTotal}}/g, dynamicData.grandTotal)
      .replace(/{{orderNumber}}/g, dynamicData.orderNumber)
      .replace(/{{orderDate}}/g, dynamicData.orderDate)
      .replace(/{{billingAddress}}/g, dynamicData.billingAddress)
      .replace(/{{shippingAddress}}/g, dynamicData.shippingAddress)
      .replace(/{{invoiceNumber}}/g, dynamicData.invoiceNumber);
    // Add more replacements for additional dynamic data

    await page.setContent(replacedHtml, {
      waitUntil: "domcontentloaded",
    });

    // Wait for all images to load
    await page.waitForSelector("img");

    // Wait for all images to load
    await page.waitForSelector("style");

    // create a pdf buffer
    const pdfBuffer = await page.pdf({
      format: "A4",
    });

    // F:\commerce\backend\src\public\data\documents\invoice\39\invoice.pdf
    const invoicePath = path.join(
      __dirname,
      "..",
      "public",
      "data",
      "documents",
      "invoice",
      `${order_id}`
    );

    if (!fs.existsSync(invoicePath)) {
      fs.mkdirSync(invoicePath, { recursive: true }, (err) => {
        throw new Error(err.message);
      });
    }
    // or a .pdf file
    await page.pdf({
      format: "A4",
      path: `${invoicePath}/invoice.pdf`,
    });

    // close the browser
    await browser.close();

    // Send the PDF as a response with appropriate headers
    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader(
    //   "Content-Disposition",
    //   "inline; filename=my-fance-invoice.pdf"
    // ); // Opens in the browser
    // res.send(pdfBuffer);
    return true;
  } catch {
    // res.send("Error.");
    return false;
  }
};

const getOrderListById = async (req, res) => {
  try {
    const user_id = req.params.id;
    if (!isID(user_id)) {
      return res.status(500).json({ ok: false, message: "Invalid user-id." });
    }
    const list = await QueryOrderListByUserId(user_id);

    if (list === false) {
      return res.status(400).json({ ok: false, message: "No order found." });
    }

    const orderList =  await Promise.all( list.map( async (orderDetails) => {
      const orderItems = await QueryOrderItemsByID(orderDetails.order_id);
      return {
        ...orderDetails,
        payment_request: orderDetails.payment_request
          ? JSON.parse(orderDetails.payment_request)
          : orderDetails.payment_request,
        payment_response: orderDetails.payment_response
          ? JSON.parse(orderDetails.payment_response)
          : orderDetails.payment_response,
        billing_address: JSON.parse(orderDetails.billing_address),
        shipping_address: JSON.parse(orderDetails.shipping_address),
        orderItems,
      };
    }));
    return res.status(200).json({
      ok: true,
      orderList,
      message: "order Found.",
    });
  } catch (error) {
    console.error("getOrderListById", error);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong.",
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const order_id = req.params.id;
    const orderDetails = await getFullOrderDetilsById(order_id);
    if (orderDetails === false) {
      return res
        .status(500)
        .json({ ok: false, message: "Something went wrong." });
    }
    return res.status(200).json({
      ok: true,
      message: "Order details.",
      orderDetails,
    });
  } catch (error) {
    console.error("getOrder", error);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong.",
    });
  }
};

const verifyOrder = async (req, res) => {
  try {
    const currentDateTime = getCurrentDateTime();
    const { user_id } = req.tokenData;
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
    const data = `${razorpayOrderId}|${razorpayPaymentId}`;
    const isSignatureValid = razorpayVerifySignature(data, razorpaySignature);
    if (!isSignatureValid) {
      return res.status(400).json({ ok: false, message: "Payment Failed" });
    }

    const payment = await razorpayInstance.payments.fetch(razorpayPaymentId);
    const orderDetails = await QueryOrderByID(payment.notes.order_id);
    const isValidOrder =
      orderDetails &&
      orderDetails.razorpay_order_id === razorpayOrderId &&
      orderDetails.order_status === 1 &&
      orderDetails.payment_status === 1;

    if (!isValidOrder) {
      return res
        .status(400)
        .json({ ok: false, message: "Something went wrong." });
    }
    if (payment.order_id !== razorpayOrderId || payment.status !== "captured") {
      const updatePayload = {
        payment_status: 3,
        payment_response: payment,
        order_status: 13,
        updatedBy: user_id,
        updatedAt: currentDateTime,
      };

      await Promise.all([
        UpdateOrderById(orderDetails.order_id, updatePayload),
        CreateOrderStatusLog({
          order_id: orderDetails.order_id,
          log_date: currentDateTime,
          status_id: 13,
          createdBy: user_id,
          createdAt: currentDateTime,
        }),
      ]);
      return res
        .status(400)
        .json({ ok: false, message: "Payment failed or order ID mismatch!" });
    }

    const successUpdatePayload = {
      payment_status: 2,
      payment_response: payment,
      payment_method: payment.method,
      order_status: 4,
      updatedBy: user_id,
      updatedAt: currentDateTime,
    };

    await Promise.all([
      UpdateOrderById(orderDetails.order_id, successUpdatePayload),
      CreateOrderStatusLog({
        order_id: orderDetails.order_id,
        log_date: currentDateTime,
        status_id: 4,
        createdBy: user_id,
        createdAt: currentDateTime,
      }),
      UpdateCartByUserId(user_id, {
        isDelete: true,
        createdBy: user_id,
        createdAt: currentDateTime,
      }),
    ]);

    const invoiceNo = await GenerateOrderInvoiceNo(orderDetails.order_id);
    await generateInvoice(orderDetails.order_id);
    return res
      .status(200)
      .json({ ok: true, message: "Payment successful!", orderDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: "Something went wrong.",
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const currentDateTime = getCurrentDateTime();
    const { user_id, fname, lname } = req.tokenData;
    const sameAsBilling = req.body["same-as-billing"];
    const isValidShippingAddress = SHIPPING_ADDRESS_FIELDS.every(
      (field) => req.body[field] !== undefined
    );

    if (
      !isValidShippingAddress ||
      (!sameAsBilling &&
        !BILLING_ADDRESS_FIELDS.every((field) => req.body[field] !== undefined))
    ) {
      return res
        .status(400)
        .json({ ok: false, message: ERROR_MESSAGES.MISSING_ADDRESSES });
    }

    const shippingAddressData = mapAddressData(
      req.body,
      SHIPPING_ADDRESS_FIELDS,
      user_id,
      currentDateTime
    );

    const shippingAddressId = await CreateAddress({
      ...shippingAddressData,
      address_type: "shipping",
    });
    let billingAddressId;
    if (Boolean(sameAsBilling)) {
      billingAddressId = shippingAddressId;
    } else {
      const billingAddressData = mapAddressData(
        req.body,
        BILLING_ADDRESS_FIELDS,
        user_id,
        currentDateTime
      );
      billingAddressId = await CreateAddress({
        ...billingAddressData,
        address_type: "billing",
      });
    }

    const cartItems = await QueryCartByUserId(user_id);
    if (!cartItems || cartItems.length === 0) {
      return res
        .status(402)
        .json({ ok: false, message: ERROR_MESSAGES.CART_EMPTY });
    }

    const orderAmount = calculateOrderAmount(cartItems);

    const orderInfo = {
      user_id,
      shipping_address_id: shippingAddressId.address_id,
      billing_address_id: billingAddressId.address_id,
      order_amount: orderAmount,
      order_datetime: currentDateTime,
      order_status: 1,
      createdBy: user_id,
      createdAt: currentDateTime,
    };

    const newOrder = await CreateOrder(orderInfo);
    if (!newOrder) {
      return res
        .status(402)
        .json({ ok: false, message: ERROR_MESSAGES.SOMETHING_WENT_WRONG });
    }

    const orderItemsInfo = createOrderItemsInfo(
      newOrder.order_id,
      cartItems,
      user_id
    );

    await CreateOrderStatusLog({
      order_id: newOrder.order_id,
      log_date: currentDateTime,
      status_id: 1,
      createdBy: user_id,
      createdAt: currentDateTime,
    });

    const newOrderItem = await BulkCreateOrderItem(orderItemsInfo);
    if (!newOrderItem) {
      return res
        .status(402)
        .json({ ok: false, message: ERROR_MESSAGES.SOMETHING_WENT_WRONG });
    }

    const options = {
      amount: Number(newOrder.order_amount) * 100, // amount == Rs 10
      currency: "INR",
      receipt: `receipt#${newOrder.order_id}`,
      payment_capture: 1,
      // 1 for automatic capture // 0 for manual capture
      notes: {
        customer_name: `${fname} ${lname}`,
        order_type: "Product Purchase",
        order_id: newOrder.order_id,
      },
    };
    const order = await razorpayInstance.orders.create(options);

    const orderNo = `EC/${new Date().getFullYear()}/OG`;
    const totalOrderString = String(newOrder.order_id);
    const zerosToAdd = 6 - totalOrderString.length;
    let generateOrdereNo = null;
    if (zerosToAdd > 0) {
      const paddedTotalOrder = "0".repeat(zerosToAdd) + totalOrderString;
      generateOrdereNo = orderNo + paddedTotalOrder;
    } else {
      generateOrdereNo = orderNo + totalOrderString;
    }
    await UpdateOrderById(newOrder.order_id, {
      payment_gateway: "Razorpay",
      razorpay_order_id: order.id,
      order_no: generateOrdereNo,
      payment_status: 1,
      payment_request: order,
    });

    return res.status(201).json({
      ok: true,
      message: SUCCESS_MESSAGES.ORDER_CREATED,
      order: order,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ ok: false, message: ERROR_MESSAGES.SOMETHING_WENT_WRONG });
  }
};

// Helper function to calculate order amount efficiently
const calculateOrderAmount = (cartItems) => {
  return cartItems.reduce(
    (total, item) => total + item.product_msp * item.quantity,
    0
  );
};

// Helper function to prepare order items information for bulk insertion
const createOrderItemsInfo = (order_id, cartItems, user_id) => {
  const currentDateTime = getCurrentDateTime();
  return cartItems.map((item) => ({
    order_id,
    quantity: item.quantity,
    product_id: item.product_id,
    price: item.product_msp,
    createdBy: user_id,
    createdAt: currentDateTime,
  }));
};

const addInitialData = async (req, res) => {
  try {
    await AddInitialStatusData();
    return res.status(201).json({ ok: true, message: "added" });
  } catch (error) {
    console.error("Error adding initial data:", error);
    return res
      .status(500)
      .json({ ok: false, message: ERROR_MESSAGES.SOMETHING_WENT_WRONG });
  }
};

module.exports = {
  getFullOrderDetilsById,
  createOrder,
  addInitialData,
  verifyOrder,
  getOrder,
  generateInvoice,
  getOrderListById,
};
