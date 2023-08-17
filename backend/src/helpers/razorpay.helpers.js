// NOTE: Razorpay Helper Functions.
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Load environment variables or use empty strings as defaults
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || "";
const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET || "";

// Validate that necessary environment variables are provided
if (!RAZORPAY_KEY_ID || !RAZORPAY_SECRET) {
  throw new Error(
    "Both RAZORPAY_KEY_ID and RAZORPAY_SECRET must be provided in the environment."
  );
}

// Create a new instance of Razorpay with the provided credentials
const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_SECRET,
});

// Verify the authenticity of Razorpay signatures using HMAC-SHA256
const razorpayVerifySignature = (data, razorpaySignature) => {
  const signature = crypto
    .createHmac("sha256", RAZORPAY_SECRET)
    .update(data)
    .digest("hex");
  return signature === razorpaySignature;
};

// Export the instantiated Razorpay instance and signature verification function
module.exports = {
  razorpayInstance,
  razorpayVerifySignature,
};
