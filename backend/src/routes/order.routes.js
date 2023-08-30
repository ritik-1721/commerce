const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth.middlewares");
const {
  createOrder,
  verifyOrder,
  addInitialData,
  getOrder
} = require("../controllers/order.controllers");

router.post("/create", verifyToken, createOrder);
router.get("/:id", getOrder);
router.post("/verify", verifyToken, verifyOrder);
router.post("/add-initial-data", verifyToken, addInitialData);

module.exports = router;
