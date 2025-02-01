import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  console.log("API Route Hit: /api/create-payment-intent");

  if (req.method === "POST") {
    try {
      const { amount, currency, email } = req.body;      
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        receipt_email: email,
        payment_method_types: ["card"],
      });

      res.status(200).json({
        clientSecret: paymentIntent?.client_secret,
        paymentIntent,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
