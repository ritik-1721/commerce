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

const QueryOrderItemsByID = async (order_id) => {
  const base_url = "http://localhost:1000/";
  try {
    const result = await db.sequelize.query(
      `SELECT  
                t1.* ,
                t2.product_title,
                t2.product_sub_title,
                t2.product_description,
                t2.product_slug,
                t2.product_code,
                t2.product_sku,
                t2.product_msp,
                t2.product_mrp,
                t3.gst_percentage,
                t3.gst_id,
                MIN(t2_1.priority),
                CONCAT(
                    "${base_url}static/images/",
                    IFNULL(t2_1.img_name, "default.jpg")
                ) AS img_link
       FROM    
               order_item_masters t1 , 
               product_masters t2 
               LEFT JOIN product_imgs t2_1 ON ( t2.product_id = t2_1.product_id AND t2_1.isDelete = 0 ), 
               gst_masters t3
       WHERE   t1.order_id=${order_id} AND t1.isDelete=0 AND t1.product_id=t2.product_id AND t2.isDelete=0
       GROUP BY t1.order_item_id`,
      { type: db.QueryTypes.SELECT }
    );
    return result.length > 0 ? result : false;
  } catch (error) {
    console.log("ERROR QueryOrderItemsByID >>> ", error);
    return false;
  }
};

const QueryOrderByID = async (order_id) => {
  try {
    const result = await db.sequelize.query(
      `SELECT
          t1.*, t2.*,
          ( 
            SELECT  JSON_OBJECT(
                          'email', t1_a.email,
                          'lname', t1_a.lname,
                          'fname', t1_a.fname,
                          'receiver_mobile', t1_a.receiver_mobile,
                          'alternative_mobile', t1_a.alternative_mobile,
                          'apartment_suite_unit', t1_a.apartment_suite_unit,
                          'street_address', t1_a.street_address,
                          'city', t1_a.city,
                          'state', t1_a.state,
                          'pincode', t1_a.pincode,
                          'country', t1_a.country,
                          'address_type', 'Billing'
                      )
            FROM   address_masters t1_a
            WHERE   t1_a.isDelete = 0 AND t1_a.address_id = t1.billing_address_id 
          ) AS billing_address,
          ( 
            SELECT JSON_OBJECT(
                          'email', t1_a.email,
                          'lname', t1_a.lname,
                          'fname', t1_a.fname,
                          'receiver_mobile', t1_a.receiver_mobile,
                          'alternative_mobile', t1_a.alternative_mobile,
                          'apartment_suite_unit', t1_a.apartment_suite_unit,
                          'street_address', t1_a.street_address,
                          'city', t1_a.city,
                          'state', t1_a.state,
                          'pincode', t1_a.pincode,
                          'country', t1_a.country,
                          'address_type', 'Shipping'
                      )
             FROM   address_masters t1_a
             WHERE  t1_a.isDelete = 0 AND t1_a.address_id = t1.shipping_address_id
          ) AS shipping_address
      FROM order_masters t1, order_statuses t2
      WHERE t1.isDelete = 0 AND t1.order_id = ${order_id} AND t1.order_status = t2.status_id;`,
      { type: db.QueryTypes.SELECT }
    );
    return result.length > 0 ? result[0] : false;
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
  QueryOrderItemsByID,
};
