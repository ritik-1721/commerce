const router = require("express").Router();
const Razorpay = require("razorpay");

router.post("/payDetails", async function paymentDetails(req, res) {
  try {
    const instance = new Razorpay({
      key_id: "rzp_test_QwRkxxPsNKaaaQ",
      key_secret: "uQYkCay3cdnTnAmTzq4FH31G",
    });

    await instance.payments
      .fetch(req.body.razorpay_payment_id)
      .then((order) => {
        res.status(200).json({
          success: true,
          data: order,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      statusCode: "400",
      err: "something went wrong",
    });
  }
});

module.exports = router;
