const express = require("express");
const Razorpay = require("razorpay");
const app = express();
const bodyParser = require("body-parser");

// Use bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());

var instance = new Razorpay({
  key_id: "your_key_id",
  key_secret: "your_key_secret",
});

// Route for creating an order
app.post("/create/orderId", (req, res) => {
  // Create an order with Razorpay
  var options = {
    amount: req.body.amount,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  };

  instance.orders.create(options, function (err, order) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Order creation failed" });
    }
    res.status(200).json(order);
  });
});

// Handle the Razorpay callback
app.post("/razorpay-callback", (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  // Implement Razorpay webhook signature verification here
  // Replace 'your_webhook_secret' with your actual webhook secret
  const webhookSecret = "your_webhook_secret";
  

  const isValidSignature = validateWebhookSignature(
    JSON.stringify(req.body),
    razorpay_signature,
    webhookSecret
  );

  if (!isValidSignature) {
    console.error("Invalid signature");
    return res.status(400).json({ error: "Invalid signature" });
  }

  // Payment verification logic goes here

  // Save payment information to the database

  // Send a success response
  res.status(200).send("Payment successful");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
