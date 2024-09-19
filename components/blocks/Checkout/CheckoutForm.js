
import { useStripe, useElements } from '@stripe/react-stripe-js';
import {
  PaymentElement,
} from '@stripe/react-stripe-js';

const CheckoutForm = ({ setStripe, setElements }) => {
  const stripe = useStripe();
  const elements = useElements();
  setStripe(stripe);
  setElements(elements);

  return (
    <div className='form_check full'>
      <PaymentElement />
    </div>
  );
};

export default CheckoutForm;
