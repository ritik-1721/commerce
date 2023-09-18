const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth.middlewares");
const {
  createOrder,
  verifyOrder,
  addInitialData,
  getOrder,
  generateInvoice,
  getOrderListById
} = require("../controllers/order.controllers");

router.post("/create", verifyToken, createOrder);
router.get("/in", generateInvoice);
router.get("/:id", getOrder);
router.post("/list/:id", getOrderListById)
router.post("/verify", verifyToken, verifyOrder);
router.post("/add-initial-data", verifyToken, addInitialData);

module.exports = router;
