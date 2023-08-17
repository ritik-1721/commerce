const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

/**
 * Create a JWT token.
 * @param {object} payload - The payload to be stored in the token.
 * @returns {string} The generated JWT token.
 */

const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, jwtSecret, {
    expiresIn: expiresIn,
  });
  return accessToken;
};

/**
 * Verify a JWT token.
 * @param {string} token - The JWT token to be verified.
 * @returns {object|false} The token payload if verification is successful, or false if it fails.
 * @throws {Error} If token verification fails.
 */
const verifyToken = (token) => {
  try {
    const tokenData = jwt.verify(token, jwtSecret);
    return tokenData;
  } catch (error) {
    //throw new Error("Invalid token"); // Throw a specific error
    return false;
  }
};

module.exports = {
  createToken: generateToken,
  verifyToken,
};
