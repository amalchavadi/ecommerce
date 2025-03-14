import React from 'react';
import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';

const Checkout = () => {
  const { cart } = useCart();

  const handleCheckout = async () => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart }),
    });
    const { id } = await response.json();
    await stripe.redirectToCheckout({ sessionId: id });
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handleCheckout}>Pay Now</button>
    </div>
  );
};

export default Checkout;
