const express = require("express");
const Razorpay = require("razorpay");
const app = express();
const bodyParser = require("body-parser");

// Use bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());

var instance = new Razorpay({
  key_id: "rzp_test_88DlPF9rFIOul7",
  key_secret: "NXCPz4dA00CWDNyfR6sGgN4z",
});

app.get("/", (req, res) => {
  res.sendFile("donation.html", { root: __dirname });
});
console.log("the ser ver has been");

// Route for creating an order
app.post("/create/orderId", (req, res) => {
  console.log("create orderId request", req.body);
  var options = {
    amount: req.body.amount, // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  instance.orders.create(options, function (err, order) {
    console.log(order);
    res.send({ orderId: order.id });
  });
});

// app.post("/api/payment/verify", (req, res) => {
//   let generated_signature = hmac_sha256(
//     order_id + "|" + razorpay_payment_id,
//     secret
//   );

//   if (generated_signature == razorpay_signature) {
//     console.log("payment is successful");
//   }
//   var {
//     validatePaymentVerification,
//     validateWebhookSignature,
//   } = require("./dist/utils/razorpay-utils");
//   validatePaymentVerification(
//     { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
//     signature,
//     secret
//   );
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
