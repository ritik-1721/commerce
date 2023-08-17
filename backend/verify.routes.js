const router = require("express").Router();
const { verifyToken } = require("../middleware/auth.middlewares");
const crypto = require("crypto");

router.post("/verify", async function verify(req, res) {
  try {
    let body =
      req.body.response.razorpay_order_id +
      "|" +
      req.body.response.razorpay_payment_id;

    var expectedSignature = crypto
      .createHmac("sha256", "uQYkCay3cdnTnAmTzq4FH31G")
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === req.body.response.razorpay_signature) {
      res.status(200).send({
        statusCode: 200,
        msg: "Sign Valid",
      });
    } else {
      res.status(500).send({
        statusCode: 500,
        err: "Sign Invalid",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      statusCode: 500,
      err: "Internal Server Error",
    });
  }
});

module.exports = router;
