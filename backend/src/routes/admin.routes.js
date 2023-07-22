const router = require("express").Router();
const { verifySession } = require("../middlewares/auth.middlewares");
const {
  login,
  home,
  attribute,
  category,
  product,
  productList,
} = require("../controllers/admin.controllers");
router.get("/", verifySession, function (req, res) {
  res.redirect("/admin/home");
});
router.get("/home", verifySession, home);
router.get("/attribute", verifySession, attribute);
router.get("/category", verifySession, category);
router.get("/product", verifySession, product);
router.get("/product-list", verifySession, productList);
router.get("/logout", verifySession, (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
router.get("/login", login);
module.exports = router;
