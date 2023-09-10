const Razorpay = require('razorpay'); // Use the Razorpay Node.js SDK

// Initialize Razorpay with your API key and secret
const razorpayApiKey = 'rzp_test_88DlPF9rFIOul7';
const razorpayApiSecret = 'NXCPz4dA00CWDNyfR6sGgN4z';
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
