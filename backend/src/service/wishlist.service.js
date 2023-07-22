const db = require("../models/index");

// 👇️ Models Use
const WishlistMaster = db.wishlistMaster;

const CreateWishlist = async (info) => {
  try {
    const newUser = await WishlistMaster.create(info);
    return newUser instanceof WishlistMaster ? newUser.toJSON() : false;
  } catch (error) {
    return false;
  }
};

const QueryWishlistByUserId = async (user_id) => {
  try {
    const base_url = "http://localhost:1000/";
    const result = await db.sequelize.query(
      `SELECT t1.*, t2.gst_percentage, MIN(t1_1.priority), CONCAT( "${base_url}static/images/", IFNULL(t1_1.img_name, "default.jpg"), "?w=240&h=240" ) AS img_link FROM product_masters t1 LEFT JOIN product_imgs t1_1 ON ( t1.product_id = t1_1.product_id AND t1_1.isDelete = 0 ), gst_masters t2 WHERE t1.isDelete = 0 AND t1.gst_id = t2.gst_id AND t2.isDelete = 0 AND FIND_IN_SET( t1.product_id, ( SELECT GROUP_CONCAT(t3.product_id SEPARATOR ',') FROM wishlist_masters t3 WHERE t3.user_id = ${user_id} AND t3.isDelete = 0 )) GROUP BY t1.product_id;`,
      { type: db.QueryTypes.SELECT }
    );
    return result.length > 0 ? result : false;
  } catch (error) {
    return false;
  }
};

const QueryWishlistByUserIdAndProductId = async (user_id, product_id) => {
  try {
    const result = await WishlistMaster.findOne({
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

const UpdateWishlistById = async (wishlist_id, info) => {
  try {
    const result = await WishlistMaster.update(
      { ...info },
      { where: { wishlist_id: Number(wishlist_id), isDelete: false } }
    );
    return result[0] > 0 ? true : false;
  } catch (err) {
    return false;
  }
};

module.exports = {
  QueryWishlistByUserIdAndProductId,
  QueryWishlistByUserId,
  UpdateWishlistById,
  CreateWishlist,
};
