// components/StripeCheckoutButton.js
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';




const StripeCheckoutButton = ({ bidId }) => {
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
        <div className='pt-[50vh]'>

            <form onSubmit={handleSubmit}>

                <button type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default StripeCheckoutButton;
