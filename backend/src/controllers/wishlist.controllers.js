const {
  QueryWishlistByUserId,
  UpdateWishlistById,
  QueryWishlistByUserIdAndProductId,
  CreateWishlist,
} = require("../service/wishlist.service");

const { getCurrentDateTime } = require("../helpers/local.helpers");
const { QueryProductById } = require("../service/product.services");

const getWishlist = async (req, res) => {
  try {
    const { user_id } = req.tokenData;
    const result = await QueryWishlistByUserId(user_id);
    if (result === false) {
      return res
        .status(200)
        .json({ ok: true, wishlist: [], message: "Wishlist Empty." });
    } else {
      return res
        .status(200)
        .json({ ok: true, message: "Wishlist successfully", wishlist: result });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

const removeFromWishlist = async (req, res) => {
  const currentDateTime = getCurrentDateTime();
  try {
    const { user_id } = req.tokenData;
    const product_id = req.params.id;
    const isProductRemoved = await QueryWishlistByUserIdAndProductId(
      user_id,
      product_id
    );
    if (isProductRemoved === false) {
      return res
        .status(402)
        .json({ ok: false, message: "Product already removed." });
    }
    const info = {
      isDelete: true,
      updatedBy: user_id,
      updatedAt: currentDateTime,
    };
    const isUpdateSuccessful = await UpdateWishlistById(
      isProductRemoved.wishlist_id,
      info
    );
    if (isUpdateSuccessful === false) {
      return res
        .status(402)
        .json({ ok: false, message: "Something went wrong." });
    }
    const productDetails = await QueryProductById(product_id);
    return res.status(200).json({
      ok: true,
      message: "Product removed successfully.",
      productDetails: productDetails[0],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

const addToWishlist = async (req, res) => {
  const currentDateTime = getCurrentDateTime();
  try {
    const { user_id } = req.tokenData;
    const product_id = req.params.id;
    const isProductAdded = await QueryWishlistByUserIdAndProductId(
      user_id,
      product_id
    );
    const productDetails = await QueryProductById(product_id);
    if (isProductAdded === false) {
      let info = {
        user_id: Number(user_id),
        product_id: Number(product_id),
        createdBy: Number(user_id),
        createdAt: currentDateTime,
      };
      const isAdditionSuccessful = await CreateWishlist(info);
      if (isAdditionSuccessful === false) {
        return res
          .status(402)
          .json({ ok: false, message: "Something went wrong." });
      }
      return res.status(200).json({
        ok: true,
        message: "Product added successfully.",
        productDetails: productDetails[0],
      });
    }
    return res.status(402).json({
      ok: false,
      message: "Product already added.",
      productDetails: productDetails[0],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
};
