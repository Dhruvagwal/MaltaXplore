import React, { useEffect, useState } from "react";
import AdminWrapper from "./_app";
import ReviewsList from "@/components/admin/reviews-list";
import ReportedReviewsList from "@/components/admin/reported-reviews-list";
import WebReviewsList from "@/components/admin/web-reviews-list";
import { getAllServiceReviews } from "@/features/reviews/getServiceReviews";
import { getWebReviews } from "@/features/reviews/getWebReviews";

const ReviewsDashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [webReviews, setWebReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedReviews = await getAllServiceReviews();
      setReviews(fetchedReviews);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedReviews = await getWebReviews();
      setWebReviews(fetchedReviews);
    };
    fetchData();
  }, []);

  const headings = [
    "Service",
    "User",
    "Review",
    "Rating",
    "location",
    "Created At",
  ];
  
  return (
    <AdminWrapper>
      <div className="text-2xl font-semibold mb-4">Service Reviews List</div>
      <ReviewsList headings={headings} data={reviews} />
      <div className="text-2xl font-semibold mt-16 mb-4">
        Reported Reviews List
      </div>
      <ReportedReviewsList headings={headings} data={reviews} />
      <div className="text-2xl font-semibold mt-16 mb-4">Web Reviews List</div>
      <WebReviewsList headings={headings} data={webReviews} />
    </AdminWrapper>
  );
};

export default ReviewsDashboard;
