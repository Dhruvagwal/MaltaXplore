import ReviewSection from "./ReviewSection";

const REVIEW_DATA = [
  {
    id: 1,
    name: "Sarah",
    country: "United Kingdom",
    rating: 5,
    comment:
      "It made everything so easy. No tickets to buy, just show the pass and go. Plus, the dining discounts were fantastic!",
    image: "/sarah.jpg",
  },
  {
    id: 2,
    name: "Marco",
    country: "Italy",
    rating: 5,
    comment:
      "The MaltaPass was the best decision for our trip. We saved so much and discovered places we wouldn't have otherwise visited. A must-have!",
    image: "/marco.jpg",
  },
  {
    id: 3,
    name: "Anna",
    country: "Germany",
    rating: 5,
    comment:
      "We loved it! It covered all the attractions we wanted to see and saved us a ton of money.",
    image: "/anna.jpg",
  },
];

const Reviews = ({ heading }) => {
  return (
    <ReviewSection
      heading={heading ? heading : "Real Travelers. Real Savings."}
    />
  );
};

export default Reviews;
