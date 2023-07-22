const {
  CreateUser,
  QueryListOfUsers,
  QueryUserById,
  UpdateUserById,
  QueryUserByEmail,
} = require("../service/user.services");

const { hashPassword, comparePassword } = require("../helpers/bcrypt.helpers");

const {
  createToken,
  verifyToken: jwtVerifyToken,
} = require("../helpers/jwt.helpers");

const {
  isNotEmpty,
  isPassword,
  isEmail,
} = require("../helpers/validate.helpers");

const { getCurrentDateTime, trimStr } = require("../helpers/local.helpers");

const addUser = async (req, res) => {
  const currentDateTime = getCurrentDateTime();
  try {
    const { fname, lname, email, password } = req.body;
    if (
      !isNotEmpty(fname) ||
      !isNotEmpty(lname) ||
      !isNotEmpty(email) ||
      !isNotEmpty(password)
    ) {
      return res.status(402).json({
        ok: false,
        message:
          "A first name, last name, email and password are required to signup.",
      });
    }

    if (!isEmail(email)) {
      return res
        .status(402)
        .json({ ok: false, message: "Valid email is required to signup." });
    }

    if (!isPassword(password)) {
      return res.status(402).json({
        ok: false,
        message: "Password contains at least 8 characters.",
      });
    }

    const check = await QueryUserByEmail(email);
    if (check !== false) {
      return res
        .status(402)
        .json({ ok: false, message: "Email has already been taken." });
    }

    let info = {
      fname: trimStr(fname),
      lname: trimStr(lname),
      email,
      password: hashPassword(req.body.password),
      createdAt: currentDateTime,
    };

    const newUser = await CreateUser(info);
    if (newUser === false) {
      return res
        .status(402)
        .json({ ok: false, message: "Something went wrong." });
    } else {
      const { password, ...other } = newUser;
      return res
        .status(201)
        .json({ ok: true, message: "Registered successfully.", result: other });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

const GetAllUsers = async (req, res) => {
  try {
    const userList = await QueryListOfUsers();
    if (userList === false) {
      return res.status(402).json({ ok: false, message: "No users found." });
    } else {
      return res
        .status(200)
        .json({ ok: false, message: "Users Found.", data: userList });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

const GetUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await QueryUserById(userId);
    if (user === false) {
      return res.status(402).json({ ok: false, message: "No user found." });
    } else {
      const { password, ...other } = user;
      return res
        .status(200)
        .json({ ok: true, message: "Users Found.", data: other });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

const DeleteUser = async (req, res) => {
  const currentDateTime = getCurrentDateTime();
  try {
    const userId = req.params.id;
    const info = { isDelete: true, updatedAt: currentDateTime };
    const result = await UpdateUserById(userId, info);
    if (result === false) {
      return res
        .status(402)
        .json({ ok: false, message: "Something went wrong." });
    } else {
      return res
        .status(200)
        .json({ ok: true, message: "Deleted successfully." });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!isNotEmpty(email) || !isNotEmpty(password)) {
      return res.status(402).json({
        ok: false,
        message: "An email and password are required to login.",
      });
    }
    if (!isEmail(email)) {
      return res.status(402).json({
        ok: false,
        message: "Valid email is required to signup.",
      });
    }
    const user = await QueryUserByEmail(email);
    if (user === false) {
      return res.status(402).json({
        ok: false,
        message:
          "Cannot find an account that matches the provided credentials.",
      });
    } else {
      const { password: hashPassword, ...others } = user;
      if (comparePassword(req.body.password, hashPassword)) {
        const token = createToken(others);
        // const tokenData = jwtVerifyToken(token);
        return res.status(200).json({
          ok: true,
          result: { ...others },
          token,
          // tokenExp: tokenData?.exp,
          message: "Login successfully.",
        });
      } else {
        return res.status(402).json({
          ok: false,
          message:
            "Cannot find an account that matches the provided credentials.",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "Something went wrong.",
    });
  }
};

module.exports = {
  addUser,
  GetAllUsers,
  GetUser,
  DeleteUser,
  logInUser,
};
