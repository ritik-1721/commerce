const router = require("express").Router();
const { adminLogin, verify } = require("../controllers/auth.controllers");
const { addUser, logInUser } = require("../controllers/user.controllers");
const { verifyToken } = require("../middlewares/auth.middlewares");


router.get("/", () => { console.log("s"); });
router.post("/admin-login", adminLogin);
router.post("/login", logInUser);
router.post("/register", addUser);
router.post("/verify-token", verifyToken, verify);

module.exports = router;
