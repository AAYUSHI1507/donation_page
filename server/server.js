const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Use bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Route for creating an order
app.post("/create-order", (req, res) => {
  // Implement Razorpay order creation logic here
  // Create an order with Razorpay
  razorpay.orders.create(orderData, (error, order) => {
    if (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Unable to create order" });
    } else {
      // Send the order ID to the client for payment initiation
      res.json(order); // Return the order ID to the client
    }
  });

  
  // Return the order ID to the client
  const order = {
    id: "YOUR_ORDER_ID", // Replace with your server-generated Order ID
  };
  res.json(order);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
