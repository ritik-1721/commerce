const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth.middlewares");
const { addAttribute ,deleteAttribute,GetAllAttributes} = require("../controllers/attribute.controllers");

router.post("/add", verifyToken, addAttribute);
router.delete("/:id", verifyToken, deleteAttribute);
router.get("/all", GetAllAttributes);

module.exports = router;
