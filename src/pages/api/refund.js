import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === "POST") {
      const { paymentIntentId } = req.body;
  
      if (!paymentIntentId) {
        return res.status(400).json({ error: "paymentIntentId is required" });
      }
  
      try {
        // Refund the full amount
        const refund = await stripe.refunds.create({
          payment_intent: paymentIntentId,
        });
        console.log("Refund response:", refund);
        res.status(200).json(refund);
      } catch (error) {
        console.error("Error during refund:", error);
        res.status(500).json({ error: error });
      }
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  }
  
