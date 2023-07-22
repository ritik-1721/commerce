const { QueryUserByEmail } = require("../service/user.services");
const { comparePassword } = require("../helpers/bcrypt.helpers");
const { createToken } = require("../helpers/jwt.helpers");
const { isNotEmpty, isEmail } = require("../helpers/validate.helpers");

const adminLogin = async (req, res) => {
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
      return res.status(403).json({
        ok: false,
        message:
          "Cannot find an account that matches the provided credentials.",
      });
    } else {
      const { password: hashPassword, ...others } = user;
      if (
        comparePassword(req.body.password, hashPassword) &&
        user.isAdmin === true
      ) {
        const accessToken = createToken(others);
        req.session.userDate = { ...others, token: accessToken, login: true };
        return res.status(200).json({
          ok: true,
          //data: { ...others },
          //accessToken,
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
  } catch {
    return res.status(500).json({
      ok: false,
      message: "Something went wrong.",
    });
  }
};

const verify = async (req, res) => {
  return res.status(200).json({
    ok: true,
    tokenData: req.tokenData,
    message: "Login successfully.",
  });
};

module.exports = {
  adminLogin,
  verify,
};
