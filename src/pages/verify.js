import { useRouter } from "next/router";
import React, { useEffect } from "react";

function verify() {
  const router = useRouter();
  const {
    bookingId,
    payment_intent,
    payment_intent_client_secret,
    redirect_status,
  } = router.query;
  useEffect(() => {
    // router.push({
    //   pathname: `/complete`,
    //   query: {
    //     bookingId,
    //     payment_intent,
    //     payment_intent_client_secret,
    //     redirect_status,
    //   },
    // });
  }, []);
}

export default verify;
