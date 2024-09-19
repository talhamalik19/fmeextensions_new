import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_Ol2MvRH4xD8EmwjKDYgWrxCJ00DlemXJ3s', {
  apiVersion: '2020-03-02',
});

export default async function handler(req, res) {
  const id = req.query.id;
  try {
    if (!id || typeof id !== 'string' || !id.startsWith('cs_')) {
      throw new Error('Incorrect CheckoutSession ID.');
    }
    const checkout_session = await stripe.checkout.sessions.retrieve(id, { expand: ['payment_intent'] });

    res.status(200).json(checkout_session);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
