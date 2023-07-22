const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth.middlewares");
const {
  addAttributeValue,
  deleteAttributeValue,
  getAttributeValueByAttributeId,
} = require("../controllers/attributeValue.controllers");

router.post("/add", verifyToken, addAttributeValue);
router.delete("/:id", verifyToken, deleteAttributeValue);
router.get("/all-by-attribute/:id", getAttributeValueByAttributeId);

module.exports = router;
