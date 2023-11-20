// components/CheckoutForm.js
import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({ bidId }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();


        const response = await fetch(`https://infinity-site.onrender.com/api/v1/bids/${bidId}/win-and-pay`, {
            method: 'POST',
        });
        const session = await response.json();
        console.log(session)
        // Redirect to Checkout page
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.error(result.error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;
