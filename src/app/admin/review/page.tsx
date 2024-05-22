"use client";
import { useState } from "react";
import Breadcrumb from "~/components/admin-components/Breadcrumb";
import BodyReview from "~/components/admin-components/review/BodyReview";

const ReviewPage = () => {
  return (
    <div className="p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="All Reviews" />
      <BodyReview />
    </div>
  );
};
export default ReviewPage;
