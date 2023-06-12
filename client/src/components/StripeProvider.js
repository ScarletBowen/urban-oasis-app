// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     setIsProcessing(true);

//     const cardElement = elements.getElement(CardElement);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });

//     if (error) {
//       setErrorMessage(error.message);
//       setIsProcessing(false);
//       return;
//     }


//     cardElement.clear();
//     setErrorMessage(null);
//     setIsProcessing(false);
//     alert('Payment successful!');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="form-row">
//         <label htmlFor="card-element">Card Details</label>
//         <div id="card-element">
//           <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
//         </div>
//       </div>
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//       <button type="submit" disabled={isProcessing}>
//         {isProcessing ? 'Processing...' : 'Pay'}
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;
