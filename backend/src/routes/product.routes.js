const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth.middlewares");
const {
  addProduct,
  getAllProduct,
  addProductImg,
  getAllProductImgsById,
  getProductDetailsByProductSlug,
  getProductsCategorySlug
} = require("../controllers/product.controllers");

router.post("/add", verifyToken, addProduct);
router.get("/all", getAllProduct);
router.get("/:slug", getProductDetailsByProductSlug);
router.post("/c/:slug", getProductsCategorySlug);
router.get("/imgs/:id", getAllProductImgsById);
router.post("/add-img", verifyToken, addProductImg);


module.exports = router;
