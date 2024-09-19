import React from "react";
import dlv from "dlv";
import RattingStar from "@/components/shared/RattingStar";
import Image from "next/image";
import Link from "next/link";
import ProductReviews from './index'

export default function ProductDetails({reviewDtl, product, setReviewDtl, user, setUser, sarabun }) {
  const reviewProduct = product;
  return (
    <>
    {reviewDtl ? (<><p className={`text-xl sm:text-2xl xl:text-3xl text-titleColor font-medium mb-2 ${sarabun}`}>
        Product Review Detail
      </p>{" "}
      <hr className="mb-6" />
      <p className="mb-6 text-base text-textColor italic">
            Submitted on{" "}
            {new Date(reviewProduct.created_at).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </p>
      <div className="product">
        <Link href={`/${dlv(reviewProduct, "product.url_key")}`}>
          <img
            // loader={imageLoader}
            className="rounded-lg"
            src={reviewProduct.product.image.url}
            alt={reviewProduct.product.label}
            width={400}
            height={400}
          />
        </Link>
        <h2 className={`text-2xl lg:text-3xl font-normal my-4 ${sarabun}`}>
          {reviewProduct.product.name}
        </h2>
      </div>

      <div className="section_bg p-[30px]">
      <div className="reviews">
        <h2 className="text-xl sm:text-2xl xl:text-3xl text-titleColor font-medium mb-6 text-center">Your Rreviews</h2> <hr />
        <div className="rating-breakdown my-6">
          <p className="text-xl font-medium mb-4 text-titleColor">Rating Breakdown</p>
          {dlv(reviewProduct, "ratings_breakdown").map((rating) => (
            <>
              <div className="rating-breakdown-stars flex items-center py-2">
                <span className="w-28">{rating.name}</span>
                <RattingStar ratings={rating.value} />
              </div>
            </>
          ))}
        </div>
        <div>
          <p className="text-xl font-medium text-titleColor pb-3">{reviewProduct.summary}</p>
          <p className="primary_text">{reviewProduct.text}</p>
          
        </div>
      </div>
      <div className="flex justify-center">
      <button className="primary_cta secondary_cta mt-6" onClick={()=>setReviewDtl(false)}>View All Reviews</button>
      </div>
      </div></>) :<ProductReviews user = {user} setUser = {setUser} reviewDtl={reviewDtl} setReviewDtl={setReviewDtl}/> }
     
    </>
  );
}
