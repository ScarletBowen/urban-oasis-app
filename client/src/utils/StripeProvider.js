import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import DonationForm from '../components/DonationForm';

function Payment(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch('./config').then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
}, []);
  useEffect(() => {
    fetch('./create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({}),
    }).then(async (r) => {
      const { clientSecret } = await r.json();
      clientSecret(clientSecret);
    });
  }, []);

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

export default Payment;   
