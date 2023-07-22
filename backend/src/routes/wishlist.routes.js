const router = require("express").Router();
const { addToWishlist, removeFromWishlist, getWishlist } = require("../controllers/wishlist.controllers");
const { verifyToken } = require("../middlewares/auth.middlewares");

router.post("/:id", verifyToken, addToWishlist);
router.delete("/:id", verifyToken, removeFromWishlist);
router.get("/all", verifyToken, getWishlist);

module.exports = router;
