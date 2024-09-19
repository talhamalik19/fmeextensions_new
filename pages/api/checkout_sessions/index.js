import Stripe from 'stripe';
import { MAX_AMOUNT, MIN_AMOUNT } from '../../../config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_Ol2MvRH4xD8EmwjKDYgWrxCJ00DlemXJ3s', {
  apiVersion: '2020-03-02',
});

export default async function handler(req, res) {
  const loginuser = req.cookies.login_user;
  const customer = JSON.parse(loginuser);

  if (req.method === 'POST') {
    const amount = req.body.amount;
    const discount = req.body.discount;
    const lineItems = req.body.lineItems;
    let coupon;

    try {
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
        throw new Error('Invalid amount.');
      }

      if (discount) {
        // Create the coupon only if discount is present
        coupon = await stripe.coupons.create({
          amount_off: Math.round(Math.abs(discount.amount.value) * 100),
          duration: 'once',
          currency: discount.amount.currency,
        });
      }

      const params = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        customer_email: customer.data.customer.email,
        line_items: lineItems,
        discounts: coupon
          ? [
              {
                coupon: coupon.id,
              },
            ]
          : [], // Apply coupon only if it's present
        success_url: `${req.headers.origin}/Thankyou?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
      };

      const checkoutSession = await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
