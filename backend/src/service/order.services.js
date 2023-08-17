const db = require("../models/index");

// 👇️ Models Use
const OrderMaster = db.orderMaster;
const OrderItemMaster = db.orderItemMaster;
const OrderStatus = db.orderStatus;
const OrderStatusLog = db.orderStatusLog;

const UpdateOrderById = async (order_id, info) => {
  try {
    const result = await OrderMaster.update(
      { ...info },
      {
        where: {
          order_id: Number(order_id),
          isDelete: false,
        },
      }
    );
    return result[0] > 0 ? true : false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const CreateOrder = async (info) => {
  try {
    const newOrder = await OrderMaster.create(info);
    return newOrder instanceof OrderMaster ? newOrder.toJSON() : false;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

const QueryOrderByID = async (id) => {
  try {
    const result = await OrderMaster.findOne({
      where: {
        order_id: Number(id),
        isDelete: false,
      },
    });
    return result === null ? false : result.toJSON();
  } catch (error) {
    console.log(error);
    return false;
  }
};

const CreateOrderStatusLog = async (info) => {
  try {
    const newOrderStatusLog = await OrderStatusLog.create(info);
    return newOrderStatusLog instanceof OrderStatusLog
      ? newOrderStatusLog.toJSON()
      : false;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

const CreateOrderItem = async (info) => {
  try {
    const newOrderItem = await OrderItemMaster.create(info);
    return newOrderItem instanceof OrderItemMaster
      ? newOrderItem.toJSON()
      : false;
  } catch (error) {
    return false;
  }
};

const BulkCreateOrderItem = async (orderItems) => {
  try {
    const newOrderItems = await OrderItemMaster.bulkCreate(orderItems);
    if (!Array.isArray(newOrderItems) || newOrderItems.length === 0) {
      return false;
    }
    return newOrderItems;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
};

// Function to add initial data
const AddInitialStatusData = async () => {
  try {
    const newOrderStatus = await OrderStatus.bulkCreate([
      { status_name: "Inserted" },
      { status_name: "Pending" },
      { status_name: "Processing" },
      { status_name: "Completed" },
      { status_name: "Cancelled" },
      { status_name: "Shipped" },
      { status_name: "Delivered" },
      { status_name: "On Hold" },
      { status_name: "Refunded" },
      { status_name: "Returned" },
      { status_name: "In Transit" },
      { status_name: "Out for Delivery" },
      { status_name: "Failed" },
    ]);
    if (!Array.isArray(newOrderStatus) || newOrderStatus.length === 0) {
      return false;
    }
    return newOrderItems;
  } catch (error) {
    console.error("Error adding initial status data:", error);
    return false;
  }
};

module.exports = {
  CreateOrder,
  CreateOrderItem,
  BulkCreateOrderItem,
  AddInitialStatusData,
  UpdateOrderById,
  QueryOrderByID,
  CreateOrderStatusLog,
};
