import React, { useEffect, useState } from "react";
import Link from "next/link";
import RattingStar from "@/components/shared/RattingStar";
import dlv from "dlv";
import ProductDetails from "./ProductDetails";
import Pagination from "../Account/Pagination";
import {customer} from "@/pages/api/login";
import { useRouter } from "next/router";
import AccountsTablePlaceholder from "@/components/shared/AccountsTablePlaceholder";

export default function ProductReviews({ user, setUser, reviewDtl, setReviewDtl, sarabun}) {
  const customerData = user || null;
  const [reviewprod, setReviewProd] = useState([]);
  // const [reviewDtl, setReviewDtl] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = dlv(customerData, "data.customer.reviews.items") || [];
  const slicedRecords = records.slice().reverse().slice(firstIndex, lastIndex);
  const customerReviews = slicedRecords ? slicedRecords.reverse() : [];
  const totalPages = Math.ceil((records.length || 0) / recordsPerPage);

  //Pagination Method
  const setPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(()=>{
   async function update(){
      const {reviews, ...rest} = customerData.data.customer
      const updatedCustomer = {
        ...rest,
        reviews
      }
      const fetchedCustomer = await customer(updatedCustomer);
      setUser(fetchedCustomer)

    }
    update()
    return () => {};
  }, [])

  function calculateTotalRatingStars(ratings) {
    // Convert the average rating to a star rating
    const starRating = Math.round((ratings / 100) * 5); // Assuming ratings are out of 100

    return starRating;
  }

  const handleReview = (prod) => {
    setReviewDtl(true);
    setReviewProd(prod);
  };

  return (
    <>
     <div className="py-4 flex-1 md:p-4 lg:p-8 account-right-col">
        <h2 className={`text-lg md:text-2xl xl:text-3xl text-titleColor font-semibold mb-4 lg:mb-8 after:'' after:w-[2em] after:h-[2px] after:bg-primaryColor after:block after:mt-1 ${sarabun}`}>
          Product Reviews
        </h2>
      {!reviewDtl ? (
        <>
        { dlv(customerData, "data.customer.reviews.items")  ? (
        <>
        {dlv(customerData, "data.customer.reviews.items.length")> 0 ? (
          <>
          <div className="overflow-x-auto">
            <table className="">
              <thead className="">
                <tr className="bg-[#FFF7F2] ">
                  <th className="text-lg text-titleColor font-medium items-center p-3 min-w-[10rem]">
                    Created At
                  </th>
                  <th className="text-lg text-titleColor font-medium items-center p-3 min-w-[10rem]">
                    Product Name
                  </th>
                  <th className="text-lg text-titleColor font-medium items-center p-3 min-w-[10rem]">
                    Rating
                  </th>
                  <th className="text-lg text-titleColor font-medium items-center p-3 min-w-[10rem]">
                    Review
                  </th>
                  <th className="text-lg text-titleColor font-medium items-center p-3 min-w-[10rem]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {customerReviews.map((review) => (
                  <tr className="border-solid border-b border-[#E4E4E4] pb-4 mb-4">
                    <td
                      data-th="Order #"
                      className="text-base p-3 text-center"
                    >
                      {new Date(dlv(review, "created_at")).toLocaleDateString()}
                    </td>
                    <td
                      data-th="Order #"
                      className="text-base p-3 text-center"
                    >
                      <Link
                        href={`/${dlv(review, "product.url_key")}`}
                        className="hover:underline"
                      >
                        {dlv(review, "product.name")}
                      </Link>
                    </td>
                    <td
                      data-th="Order #"
                      className="text-base p-3 text-center flex justify-center"
                    >
                      {
                        <RattingStar
                          ratings={
                            dlv(review, "product.overall_average_rating")
                          }
                        />
                      }
                    </td>
                    <td
                      data-th="Order #"
                      className="text-base p-3 text-center"
                    >
                      {dlv(review, "text")}
                    </td>
                    <td
                      data-th="Order #"
                      className="text-base p-3 text-center"
                    >
                      <Link
                        href={""}
                        onClick={() => handleReview(review)}
                        className="hover:underline"
                      >
                        See Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPageChange}
              />
            )}
            </>

        ): <p className="text-base text-textColor">No Reviews Added</p>}
          
          </>
          ): 
           (
          <AccountsTablePlaceholder/>
        ) }
        </>
      ) : (
        <ProductDetails reviewDtl={reviewDtl} product={reviewprod} setReviewDtl={setReviewDtl} user = {customerData} setUser = {setUser} sarabun={sarabun} />
      )}
       </div>
    </>
  );
}
