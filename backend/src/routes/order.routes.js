const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth.middlewares");
const { createOrder,addInitialData } = require("../controllers/order.controllers");

router.post("/add", verifyToken, createOrder);
router.post("/add-initial-data", verifyToken, addInitialData);

module.exports = router;
