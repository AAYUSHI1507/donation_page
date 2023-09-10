const crypto = require('crypto');
// import { createHmac } from 'crypto';


// Verify the payment signature
function verifySignature(paymentId, razorpaySignature, razorpaySecretKey) {
    const text = `${paymentId}`;
    const expectedSignature = crypto.createHmac('sha256', razorpaySecretKey).update(text).digest('hex');
    return razorpaySignature === expectedSignature;
}

module.exports = {
    verifySignature,
};
