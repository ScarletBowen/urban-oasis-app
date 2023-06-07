import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const DonationForm = () => {
  const [amount, setAmount] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
        // successful payment
        console.log('Payment Method:', paymentMethod);
        alert('Thank you for your donation!');
        // Reset the form
        setAmount('');
      } else {
        console.log('Payment Error:', error);
        alert('Payment failed. Please try again.');
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Enter donation amount"
      />
      <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      <button type="submit">Donate</button>
    </form>
  );
};

export default DonationForm;
