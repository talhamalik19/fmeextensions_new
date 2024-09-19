import SectionCta from "@/components/global/SectionCta";
import SectionHead from "@/components/global/SectionHead";
import ReviewBlock from "./ReviewBlock";
import { React, useEffect, useState } from "react";
import Image from "next/image";
import dlv from "dlv";
import { imageLoader } from "@/components/shared/imageLoader";
import { getAllCustomerReviews } from "@/pages/api/review";
import { useRouter } from "next/router";
import { scroller } from 'react-scroll';
import PaginationNav from "@/components/global/PaginationNav";

function calculateStarRating(ratingsBreakdown) {
    const totalRatings = ratingsBreakdown.reduce((total, rating) => {
        return total + parseFloat(rating.value);
    }, 0);

    const averageRating = totalRatings / ratingsBreakdown.length;

    const starRating = (averageRating / 5) * 5;

    return Math.round(starRating);
}


const Customer = ({ heading, text, button, image, sarabun }) => {
    const router = useRouter();
    const { slug } = router.query;
    const pageName = slug ? slug[0] : 'home';
    const [pageSize, setPageSize] = useState(pageName == 'home' ? 10 :9);
    const [totalReviewsOfProducts, setTotalReviewsOfProducts] = useState(0);
    const [page, setPage] = useState(1);
    
    const scrollToDiv = (divId) => {
        scroller.scrollTo(divId, {
            duration: 1000,
            delay: 0,
            smooth: true
        });
    };

    console.log(sarabun)
    const [windowWidth, setWindowWidth] = useState(0)
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    const shouldShowReview = windowWidth > 880;



    const [reviews, setreviews] = useState();

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedExtensions = await getAllCustomerReviews(page, pageSize);
            try {
                const extractedReviews = [];
                const allReviews = fetchedExtensions.data.getAllReviews.review_list;
                setTotalReviewsOfProducts(fetchedExtensions.data.getAllReviews.reviews_count)
                allReviews.forEach(review => {
                    // Calculate the star rating for the current review
                    const starRating = calculateStarRating(review.ratings_breakdown);

                    // Add the calculated star rating to the review
                    review.total_stars = starRating;

                    // Push the updated review to the 'extractedReviews' array
                    extractedReviews.push(review);
                });
                setreviews(extractedReviews);
            } catch (e) { }
        };
        if (pageName !== 'home') {
            scrollToDiv('customer_reviews_section');
        }
        
        fetchProducts();
    }, [page, pageName, totalReviewsOfProducts]);

    // Split the homeCustomer array in two columns
    let middleIndex = 0;
    let reviewFirstHalf = null;
    let reviewSecondHalf = null;

    if (reviews) {
        middleIndex = Math.ceil(reviews.length / 2);
        reviewFirstHalf = reviews.slice(0, middleIndex);
        reviewSecondHalf = reviews.slice(middleIndex);
    }

    // For Testimonial page
    // Split the homeCustomer array in three columns
    let testimonialIndex = 0;
    let testimonialFirstHalf = null;
    let testimonialSecondHalf = null;
    let testimonialThirdHalf = null;

    if (reviews) {
        testimonialIndex = Math.ceil(reviews.length / 3);
        testimonialFirstHalf = reviews.slice(0, testimonialIndex);
        testimonialSecondHalf = reviews.slice(testimonialIndex, testimonialIndex * 2);
        testimonialThirdHalf = reviews.slice(testimonialIndex * 2);
    }

    const numberOfPage = Math.ceil(totalReviewsOfProducts / pageSize);

    

    return (
        <>
            <div className="" id="customer_reviews_section">
                <div className="section_padding">
                    <div className="main_container">
                        <div className={pageName === 'home' ? 'customer_container home_review' : 'customer_container'}>
                            {
                                pageName === 'home' ?
                                    <div className="review_side">
                                        <div className="review_side_inner">
                                            <SectionHead title={heading} desc={text} sarabun={sarabun}/>
                                            {button && <div className="section_cta">
                                                <SectionCta props={button.field_text} ctaClass="secondary_cta" url={button.field_redirect} />
                                            </div>}
                                            <div className="image center-img">
                                                <Image
                                                    loader={imageLoader}
                                                    src={dlv(image[0], 'url')}
                                                    alt={`${dlv(image[0], 'alt')}`}
                                                    width={139}
                                                    height={74}
                                                    style={{ height: 'auto' }}
                                                />
                                            </div>
                                        </div>
                                    </div> : ''
                            }

                            {/* {
                                shouldShowReview ? (
                                    <div className="reviews">
                                        <div className="reviews_inner">
                                            <ReviewBlock custReview={pageName.toLowerCase() === 'home' ? reviewFirstHalf : testimonialFirstHalf} />
                                        </div>
                                        <div className="reviews_inner">
                                            <ReviewBlock custReview={pageName.toLowerCase() === 'home' ? reviewSecondHalf : testimonialSecondHalf} />
                                        </div>
                                        {pageName.toLowerCase() !== 'home' && ( // Render the third block only for testimonial page
                                            <div className="reviews_inner">
                                                <ReviewBlock custReview={testimonialThirdHalf} />
                                            </div>
                                        )}
                                    </div>
                                )
                                    :
                                    <div className="reviews resp_reviews">
                                        <ReviewBlock custReview={pageName.toLowerCase() === 'home' ? reviews : reviews} />
                                    </div>
                            } */}

                            <div className="reviews">
                                <ReviewBlock custReview={reviews} sarabun={sarabun}/>
                            </div>
                        </div>

                        {
                            pageName !== 'home' ? <PaginationNav totalPage={numberOfPage} page={page} setPage={setPage} />
                                : ''
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Customer;