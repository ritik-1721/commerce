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
} = require("../service/order.services");
const {
  QueryCartByUserId,
  UpdateCartByUserId,
} = require("../service/cart.services");
const { getCurrentDateTime } = require("../helpers/local.helpers");
const { CreateAddress } = require("../service/address.services");

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
      payment_request: orderDetails.payment_request?JSON.parse(orderDetails.payment_request):orderDetails.payment_request,
      payment_response: orderDetails.payment_response?JSON.parse(orderDetails.payment_response):orderDetails.payment_response,
      billing_address: JSON.parse(orderDetails.billing_address),
      shipping_address: JSON.parse(orderDetails.shipping_address),
      orderItems: orderItems,
    };
  } catch (error) {
    console.error("getFullOrderDetilsById",error);
    return false;
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
    console.error("getOrder",error);
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

    await UpdateOrderById(newOrder.order_id, {
      payment_gateway: "Razorpay",
      razorpay_order_id: order.id,
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
};
