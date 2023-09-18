const router = require("express").Router();
const { verifyToken } = require("../middlewares/auth.middlewares");
const {
  GetAllUsers,
  GetUser,
  DeleteUser,
  addUser,
  logInUser,
  updateUserById,
  updatePassword,
} = require("../controllers/user.controllers");

router.post("/register", addUser);
router.post("/login", logInUser);
router.get("/byId/:id", verifyToken, GetUser);
router.get("/all", verifyToken, GetAllUsers);
router.delete("/:id", verifyToken, DeleteUser);
router.put("/change-pwd", verifyToken, updatePassword);
router.put("/:id", verifyToken, updateUserById);

module.exports = router;
