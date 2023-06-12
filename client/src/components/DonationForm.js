import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CHECKOUT } from '../graphql/queries';
import { useQuery } from '@apollo/client';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET_KEY);


export default function DonationForm() {
  
    const [clientSecret] = useState('');
    const [ checkout, { data }] = useQuery(CHECKOUT);
  
    useEffect(() => {
      if (data) {
        stripePromise.then((res) => {
          // res.redirectToCheckout({ sessionId: data.checkout.session });
        });
      }
    }, [data]);
    return (
      <>
      <h1>Payment</h1>
      {/* stripePromise && (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
      </Elements>
      ) */}
   </>
    );
  };
