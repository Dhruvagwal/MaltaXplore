const getPaymentDetails = async (stripePromise,payment_intent_client_secret,setLoading) => {
  if (payment_intent_client_secret) {
    const stripe = await stripePromise;
    const paymentIntent = await stripe.retrievePaymentIntent(
      payment_intent_client_secret
    );
    if (paymentIntent.error) {
      console.error("Error fetching payment intent", paymentIntent.error);
    }
    return paymentIntent?.paymentIntent;
  }
  setLoading(false);
};
export default getPaymentDetails;
