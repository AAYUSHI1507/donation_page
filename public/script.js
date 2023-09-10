document.addEventListener('DOMContentLoaded', function () {
    const donateButton = document.getElementById('donate-button');
    const amountInput = document.getElementById('amount');

    donateButton.addEventListener('click', function () {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid donation amount.');
            return;
        }

        // Make an API request to your server to create an order
        fetch('/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount,
            }),
        })
        .then(response => response.json())
        .then(order => {
            // Use the received order ID to initiate the payment with Razorpay
            const options = {
                key: 'YOUR_RAZORPAY_API_KEY',
                amount: order.amount,
                currency: 'INR',
                name: 'Your Organization Name',
                description: 'Donation for a good cause',
                order_id: order.id,
                handler: function (response) {
                    // Handle successful payment (e.g., show success message)
                    console.log('Payment successful:', response);

                    // After successful payment, you can check the payment status on your server
                    // Implement this logic in your code
                },
            };

            const rzp = new Razorpay(options);
            rzp.open();
        })
        .catch(error => {
            console.error('Error creating order:', error);
        });
    });
});
