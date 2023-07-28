const {
  CreateOrder,
  BulkCreateOrderItem,
  AddInitialStatusData,
} = require("../service/order.services");
const { QueryCartByUserId } = require("../service/cart.services");
const { getCurrentDateTime } = require("../helpers/local.helpers");
const { CreateAddress } = require("../service/address.services");

// Define constants for address properties
const SHIPPING_ADDRESS_FIELDS = [
  "shipping_fname",
  "shipping_lname",
  "shipping_email",
  "shipping_receiver_mobile",
  "shipping_alternative_mobile",
  "shipping_apartment_suite_unit",
  "shipping_street_address",
  "shipping_city",
  "shipping_state",
  "shipping_pin_code",
  "shipping_country",
];

const BILLING_ADDRESS_FIELDS = [
  "billing_fname",
  "billing_lname",
  "billing_email",
  "billing_receiver_mobile",
  "billing_alternative_mobile",
  "billing_apartment_suite_unit",
  "billing_street_address",
  "billing_city",
  "billing_state",
  "billing_pin_code",
  "billing_country",
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
    addressData[field.replace("shipping_", "").replace("billing_", "")] =
      data[field];
  });
  addressData.user_id = user_id;
  addressData.createdBy = user_id;
  addressData.createdAt = currentDateTime;
  return addressData;
};

const createOrder = async (req, res) => {
  try {
    const currentDateTime = getCurrentDateTime();
    const { user_id } = req.tokenData;

    const isValidShippingAddress = SHIPPING_ADDRESS_FIELDS.every(
      (field) => req.body[field] !== undefined
    );
    const isValidBillingAddress = BILLING_ADDRESS_FIELDS.every(
      (field) => req.body[field] !== undefined
    );

    if (!isValidShippingAddress || !isValidBillingAddress) {
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
    const billingAddressData = mapAddressData(
      req.body,
      BILLING_ADDRESS_FIELDS,
      user_id,
      currentDateTime
    );
    console.log(shippingAddressData);

    console.log(billingAddressData);
    const [shippingAddressId, billingAddressId] = await Promise.all([
      CreateAddress({ ...shippingAddressData, address_type: "shipping" }),
      CreateAddress({ ...billingAddressData, address_type: "billing" }),
    ]);

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
    const newOrderItem = await BulkCreateOrderItem(orderItemsInfo);
    if (!newOrderItem) {
      return res
        .status(402)
        .json({ ok: false, message: ERROR_MESSAGES.SOMETHING_WENT_WRONG });
    }

    return res.status(201).json({
      ok: true,
      message: SUCCESS_MESSAGES.ORDER_CREATED,
      data: newOrder,
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
  createOrder,
  addInitialData,
};
