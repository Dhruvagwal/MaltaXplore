// import emailjs from "@emailjs/browser";
import axios from "axios";
export const sendEmail = async (paymentDetails) => {
  try {
    const date = new Date(paymentDetails.created * 1000).toLocaleString();
    const price = (paymentDetails.amount / 100).toFixed(2);
    const templateParams = {
      booking_date: date,
      payment_amount: price,
      user_email: paymentDetails?.receipt_email,
      payment_method: paymentDetails?.payment_method_types[0],
      payment_intent: paymentDetails?.id,
    };

    // const response = await emailjs.send(
    //   "service_w7ii0wa",
    //   "template_di5w0yw",
    //   templateParams,
    //   "XvpCI43kTo5rkOW7y"
    // );

    const response = await axios.post(
      "https://api.maltaxplore.com/send_email",
      {
        id: "confirmation-email-template",
        to: templateParams?.user_email,
        values: templateParams,
        heaader: "Hello, this is a test email!",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": 1234,
        },
      }
    );

    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendEmailToBookingPersons = async (templateDetails) => {
  console.log("templateDetails", templateDetails);
  const bookingLink = `${window.location.origin}/booking-details?booking_id=${templateDetails?.Booking_id}`;
  try {
    const templateParams = {
      user_email: templateDetails.email,
      guest_name: templateDetails.guest_name,
      booking_id: templateDetails?.Booking_id,
      service_name: templateDetails?.service_name,
      service_date: templateDetails?.service_date,
      service_location: templateDetails?.service_location,
      booker_name: templateDetails?.booker_name,
      total_tickets_booked: templateDetails?.total_tickets_booked,
      company_name: "MaltaXplore",
      booking_link: bookingLink,
    };

    // const response = await emailjs.send(
    //   "service_w7ii0wa",
    //   "template_x6lvoim",
    //   templateParams,
    //   "XvpCI43kTo5rkOW7y"
    // );

    const response = await axios.post(
      "https://api.maltaxplore.com/send_email",
      {
        id: "booking-email-template",
        to: templateParams?.user_email,
        values: templateParams,
        heaader: "Hello, this is a test email!",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": 1234,
        },
      }
    );

    console.log(response.data);

    console.log("Email sent successfully:", response.status, response.text);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
