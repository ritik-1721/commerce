const { getCurrentDateTime } = require("../helpers/local.helpers");
const {
  QueryCartByUserId,
  CreateCart,
  UpdateCartById,
  QueryCartByUserIdAndProductId,
} = require("../service/cart.services");

const { QueryProductById } = require("../service/product.services");

const addItemToCart = async (req, res) => {
  const currentDateTime = getCurrentDateTime();
  try {
    const { user_id } = req.tokenData;
    const product_id = req.params.id;
    const isProductAdded = await QueryCartByUserIdAndProductId(
      user_id,
      product_id
    );
    const productDetails = await QueryProductById(product_id);
    if (isProductAdded === false) {
      let info = {
        user_id: Number(user_id),
        product_id: Number(product_id),
        createdBy: Number(user_id),
        quantity: 1,
        createdAt: currentDateTime,
      };
      const isAdditionSuccessful = await CreateCart(info);
      if (isAdditionSuccessful === false) {
        return res
          .status(402)
          .json({ ok: false, message: "Something went wrong." });
      }
      return res.status(200).json({
        ok: true,
        message: "Product added successfully.",
        productDetails: {
          ...productDetails[0],
          attributes: await JSON.parse(productDetails[0].attributes),
          ...isAdditionSuccessful,
        },
      });
    }
    let newQuantity = isProductAdded.quantity + 1;
    const updateInfo = {
      quantity: newQuantity,
      updatedBy: user_id,
      updatedAt: currentDateTime,
    };
    const isUpdateSuccessful = await UpdateCartById(
      isProductAdded.cart_id,
      updateInfo
    );
    if (isUpdateSuccessful === false) {
      return res
        .status(402)
        .json({ ok: false, message: "Something went wrong." });
    }
    return res.status(200).json({
      ok: true,
      message: "Product added successfully.",
      productDetails: {
        ...productDetails[0],
        attributes: await JSON.parse(productDetails[0].attributes),
        ...isProductAdded,
        quantity: newQuantity,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

const deleteItemFromCart = async (req, res) => {
  const currentDateTime = getCurrentDateTime();
  try {
    const { user_id } = req.tokenData;
    const product_id = req.params.id;
    const isProductRemoved = await QueryCartByUserIdAndProductId(
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
    const isUpdateSuccessful = await UpdateCartById(
      isProductRemoved.cart_id,
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
      productDetails: {
        ...productDetails[0],
        attributes: await JSON.parse(productDetails[0].attributes),
        ...isProductRemoved,
        quantity: 0,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

const removeItemFromCart = async (req, res) => {
  const currentDateTime = getCurrentDateTime();
  try {
    const { user_id } = req.tokenData;
    const product_id = req.params.id;
    const isProductRemoved = await QueryCartByUserIdAndProductId(
      user_id,
      product_id
    );
    if (isProductRemoved === false) {
      return res
        .status(402)
        .json({ ok: false, message: "Product already removed." });
    }

    let newQuantity = isProductRemoved.quantity - 1;
    const info = {
      isDelete: newQuantity === 0 ? true : false,
      quantity: newQuantity,
      updatedBy: user_id,
      updatedAt: currentDateTime,
    };
    const isUpdateSuccessful = await UpdateCartById(
      isProductRemoved.cart_id,
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
      productDetails: {
        ...productDetails[0],
        attributes: await JSON.parse(productDetails[0].attributes),
        ...isProductRemoved,
        quantity: newQuantity,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

const getCart = async (req, res) => {
  try {
    const { user_id } = req.tokenData;
    const result = await QueryCartByUserId(user_id);
    if (result === false) {
      return res.status(200).json({
        ok: true,
        message: "Cart Empty.",
        cart: {
          items: [],
          totalItems: 0,
          totalAmount: 0,
        },
      });
    } else {
      let totalAmount = 0;
      const items = [];
      Promise.all(
        result.map((item) => {
          totalAmount += item.product_msp * item.quantity;
          items.push({
            ...item,
            attributes: JSON.parse(item.attributes),
          });
        })
      );
      return res.status(200).json({
        ok: true,
        message: "Cart successfully",
        cart: {
          items: items,
          totalItems: result.length,
          totalAmount: Math.round(totalAmount * 100) / 100,
        },
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

module.exports = {
  addItemToCart,
  deleteItemFromCart,
  removeItemFromCart,
  getCart,
};
