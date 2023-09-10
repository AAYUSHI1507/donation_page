const Razorpay = require('razorpay'); // Use the Razorpay Node.js SDK

// Initialize Razorpay with your API key and secret
const razorpayApiKey = 'YOUR_RAZORPAY_API_KEY';
const razorpayApiSecret = 'YOUR_RAZORPAY_API_SECRET';
const razorpay = new Razorpay({
    key_id: razorpayApiKey,
    key_secret: razorpayApiSecret,
});

// Function to check payment status
function checkPaymentStatus(paymentId, callback) {
    razorpay.payments.fetch(paymentId, function (error, payment) {
        if (error) {
            console.error('Error fetching payment details:', error);
            callback(error, null);
        } else {
            callback(null, payment);
        }
    });
}

module.exports = {
    checkPaymentStatus,
};
