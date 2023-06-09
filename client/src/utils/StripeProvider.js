import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Mu74GDhddzOfBnOj6t7ugiiQic08NOE8hPCqa4EXD8LNa9y8ORy5sUJJ2joehVxofZjdisgb5q0rrnKTAPA43pG00QYknLHvf');

export const StripeProvider = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};
