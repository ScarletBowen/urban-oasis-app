import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CHECKOUT } from '../utils/mutations';

const stripePromise = loadStripe('pk_test_51Mu74GDhddzOfBnOj6t7ugiiQic08NOE8hPCqa4EXD8LNa9y8ORy5sUJJ2joehVxofZjdisgb5q0rrnKTAPA43pG00QYknLHvf');


export default function DonationForm() {
  
    const [clientSecret] = useState('');
    const [data] = useState(null);
  
    useEffect(() => {
      if (data) {
        stripePromise.then((res) => {
          res.redirectToCheckout({ sessionId: data.checkout.session });
        });
      }
    }, [data]);
    return (
      <>
      <h1>Payment</h1>
      {stripePromise && clientSecret && (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <DonationForm />
      </Elements>
      )}
   </>
    );
  };
