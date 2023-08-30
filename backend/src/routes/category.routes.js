const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth.middlewares");
const {
  addCategory,
  categoryHieratchy,
  deleteCategory,
  updateIsActiveCategory,
  getCategoryBySlug,
  categoryHierarchy,
  getCategoryAttributeValuesByCategoryId,
} = require("../controllers/category.controllers.js");
const {
  getProductByCategorySlug,
} = require("../controllers/product.controllers");

router.post("/add", verifyToken, addCategory);
router.get("/hieratchy", categoryHieratchy);
router.get("/hierarchy/:id", categoryHierarchy);
router.get("/category-attribute-values/:id", getCategoryAttributeValuesByCategoryId);
router.get("/p/:slug", getProductByCategorySlug);
router.get("/:slug", getCategoryBySlug);
router.delete("/:id", verifyToken, deleteCategory);
router.post("update-is-active/:id", verifyToken, updateIsActiveCategory);

module.exports = router;
