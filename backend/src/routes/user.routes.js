const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth.middlewares");
const {
  GetAllUsers,
  GetUser,
  DeleteUser,
  addUser,
  logInUser,
} = require("../controllers/user.controllers");

router.post("/register", addUser);
router.post("/login", logInUser);
router.get("/byId/:id", verifyToken, GetUser);
router.get("/all", verifyToken, GetAllUsers);
router.delete("/:id", verifyToken, DeleteUser);

module.exports = router;
