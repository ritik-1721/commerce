const router = require("express").Router();
const Razorpay = require("razorpay");
// const { verifyToken } = require("../middleware/auth.middlewares");

// router.get("/get", async (req, res) => {
//   try {
//     const instance = new Razorpay({
//       key_id: "rzp_test_QwRkxxPsNKaaaQ",
//       key_secret: "uQYkCay3cdnTnAmTzq4FH31G",
//     });

//     const options = {
//       amount: 1000, // amount in paisa (Rs 10)
//       currency: "INR",
//       receipt: "receipt#1",
//       payment_capture: 0,
//       notes: {
//         customer_name: "John Doe",
//         order_type: "Product Purchase",
//       },
//     };

//     const order = await instance.orders.create(options);

//     if (!order) return res.status(500).send("Some error occured");

//     res.json(order);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

router.get("/get", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: "rzp_test_QwRkxxPsNKaaaQ",
      key_secret: "uQYkCay3cdnTnAmTzq4FH31G",
    });

    const options = {
      amount: 100 * 100,
      currency: "INR",
    };

    instance.orders.create(options, (err, order) => {
      if (err) {
        return res.status(400).send({
          statusCode: 400,
          err: "something went wrong",
        });
      } else {
        return res.status(200).send({
          statusCode: 200,
          data: order,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      statusCode: 500,
      err: "Internal Server Error",
    });
  }
});

// router.get("/getCat", GetCategory);

module.exports = router;
