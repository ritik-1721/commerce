const { verifyToken: jwtVerifyToken } = require("../helpers/jwt.helpers");

const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith("Bearer")) {
    const token = auth.slice(7);
    // const token = auth.split(" ")[1];
    const tokenData = jwtVerifyToken(token);
    if (tokenData === false) {
      res.status(403).json({ ok: false, message: "Token is not valid!" });
    } else {
      req.tokenData = tokenData;
      next();
    }
  } else {
    return res
      .status(401)
      .json({ ok: false, message: "You are not authenticated!" });
  }
};

// const verifyTokenAndAuthorization = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.tokenData.isAdmin) {
//       next();
//     } else {
//       res.status(403).json("You are not alowed to do that!");
//     }
//   });
// };

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.tokenData.isAdmin === true) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifySession = (req, res, next) => {
  if (req.session.userDate && req.session.userDate.isAdmin === true) {
    next();
  } else {
    res.redirect("/admin/login");
  }
};

module.exports = {
  verifyToken,
  // verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifySession,
};
