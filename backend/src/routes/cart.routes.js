const router = require("express").Router();
const {
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
  getCart,
} = require("../controllers/cart.controllers");
const { verifyToken } = require("../middlewares/auth.middlewares");

router.get("/add/:id", verifyToken, addItemToCart);
router.get("/remove/:id", verifyToken, removeItemFromCart);
router.get("/delete/:id", verifyToken, deleteItemFromCart);
router.get("/all", verifyToken, getCart);

module.exports = router;
