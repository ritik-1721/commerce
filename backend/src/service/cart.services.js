const db = require("../models/index");

// 👇️ Models Use
const CartMaster = db.cartMaster;

const UpdateCartById = async (cart_id, info) => {
  try {
    const result = await CartMaster.update(
      { ...info },
      { where: { cart_id: Number(cart_id), isDelete: false } }
    );
    return result[0] > 0 ? true : false;
  } catch (err) {
    return false;
  }
};

const CreateCart = async (info) => {
  try {
    const newCart = await CartMaster.create(info);
    return newCart instanceof CartMaster ? newCart.toJSON() : false;
  } catch (error) {
    return false;
  }
};

const QueryCartByUserIdAndProductId = async (user_id, product_id) => {
  try {
    const result = await CartMaster.findOne({
      where: {
        product_id: Number(product_id),
        user_id: Number(user_id),
        isDelete: false,
      },
    });
    return result === null ? false : result.toJSON();
  } catch (err) {
    return false;
  }
};

const QueryCartByUserId = async (user_id) => {
  try {
    const base_url = "http://localhost:1000/";
    const result = await db.sequelize.query(
      `SELECT
            t1.*,
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
            ,
              (SELECT CONCAT( '[', GROUP_CONCAT( JSON_OBJECT( 'pa_id',t_a.pa_id,'attribute_value',t_b.attribute_value, 'attribute_value_type', t_c.attribute_value_type, 'attribute_name', t_c.attribute_name , 'attribute_id', t_a.attribute_id , 'attribute_value_description', t_b.attribute_value_description , 'attribute_value_id', t_a.attribute_value_id ) ORDER BY t_c.attribute_id SEPARATOR ',' ), ']' ) FROM product_attribute_values_trans t_a, attribute_value_masters t_b, attribute_masters t_c WHERE t_b.attribute_value_id = t_a.attribute_value_id AND t_a.attribute_id = t_c.attribute_id AND t_a.isDelete = 0 AND t_a.product_id = t1.product_id ) AS attributes
         FROM
            cart_masters t1,
            product_masters t2
        LEFT JOIN product_imgs t2_1 ON
            (
                t2.product_id = t2_1.product_id AND t2_1.isDelete = 0
            ),
            gst_masters t3
        WHERE
            t2.gst_id = t3.gst_id AND t3.isDelete = 0 AND t1.product_id = t2.product_id AND t2.isDelete = 0 AND t1.quantity > 0 AND t1.user_id = ${user_id} AND t1.isDelete = 0
        GROUP BY t1.cart_id    `,
      { type: db.QueryTypes.SELECT }
    );
    return result.length > 0 ? result : false;
  } catch (error) {
    return false;
  }
};

const UpdateCartByUserId = async (user_id, info) => {
  try {
    const result = await CartMaster.update(
      { ...info },
      { where: { user_id: Number(user_id), isDelete: false } }
    );
    return result[0] > 0 ? true : false;
  } catch (err) {
    return false;
  }
};

module.exports = {
  UpdateCartByUserId,
  UpdateCartById,
  CreateCart,
  QueryCartByUserId,
  QueryCartByUserIdAndProductId,
};
