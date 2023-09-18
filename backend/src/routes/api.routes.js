const router = require("express").Router();

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const categoryRoutes = require("./category.routes");
const attributeRoutes = require("./attribute.routes");
const attributeValueRoutes = require("./attributeValue.routes");
const productRoutes = require("./product.routes");
const wishlistRouter = require("./wishlist.routes");
const cartRouter = require("./cart.routes");
const orderRoutes = require("./order.routes");
const pincodeRoutes = require("./pincode.routes");

router.use("/order", orderRoutes);
router.use("/user", userRoutes);
router.use("/wishlist", wishlistRouter);
router.use("/cart", cartRouter);
router.use("/auth", authRoutes);
router.use("/category", categoryRoutes);
router.use("/attribute", attributeRoutes);
router.use("/attribute-value", attributeValueRoutes);
router.use("/product", productRoutes);
router.use("/pincode", pincodeRoutes);

module.exports = router;