import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, orderId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'pkr',
      metadata: {
        orderId: orderId.toString(),
      },
    });
    return paymentIntent;
  } catch (error) {
    throw new Error(`ادائیگی میں خرابی: ${error.message}`);
  }
};

const confirmPayment = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent.status === 'succeeded';
  } catch (error) {
    throw new Error(`ادائیگی کی تصدیق میں خرابی: ${error.message}`);
  }
};

export { createPaymentIntent, confirmPayment };
