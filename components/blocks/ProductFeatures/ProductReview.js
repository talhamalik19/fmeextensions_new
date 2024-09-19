import { useEffect, useState } from 'react'
import ReviewBlock from '../Customer/ReviewBlock';
import ReviewDialog from '@/components/shared/ReviewDialog';
import dlv from 'dlv';

function calculateStarRating(ratingsBreakdown) {
    const totalRatings = ratingsBreakdown.reduce((total, rating) => {
        return total + parseFloat(rating.value);
    }, 0);

    const averageRating = totalRatings / ratingsBreakdown.length;

    const starRating = (averageRating / 5) * 5;

    return Math.round(starRating);
}

export default function ProductReview({ product, blockContent }) {
    const extractedReviews = [];
    product.reviews.items.forEach(review => {
        // Calculate the star rating for the current review
        const starRating = calculateStarRating(review.ratings_breakdown);

        // Add the calculated star rating to the review
        review.total_stars = starRating;

        // Push the updated review to the 'extractedReviews' array
        extractedReviews.push(review);
    });

    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(extractedReviews.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, extractedReviews.length);
    const currentItems = extractedReviews.slice(startIndex, endIndex);

    const productIndex = Math.ceil(currentItems.length / 3);
    const productFirstHalf = currentItems.slice(0, productIndex);
    const productSecondHalf = currentItems.slice(productIndex, productIndex * 2);
    const productThirdHalf = currentItems.slice(productIndex * 2);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    // For Responsive Layout

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
    return (

        <div className="section_padding">
            <div className="main_container">
                <div className="customer_container prod_dtl_cust_review">
                    <h3 className="primary_title">
                        {product.reviews_heading && product.reviews_heading} {extractedReviews.length > 0 && <span className="review_count">({extractedReviews.length})</span>}
                    </h3>
                    {/* {
                        shouldShowReview ? (
                            <div className="reviews">
                                <div className="reviews_inner">
                                    <ReviewBlock custReview={productFirstHalf} />
                                </div>
                                <div className="reviews_inner">
                                    <ReviewBlock custReview={productSecondHalf} />
                                </div>
                                <div className="reviews_inner">
                                    <ReviewBlock custReview={productThirdHalf} />
                                </div>
                            </div>
                        ) :
                        <div className="reviews resp_review">
                            <ReviewBlock custReview={currentItems.slice(0, 6)} />
                        </div>
                        
                    } */}
                    {currentItems && <div className="reviews">
                        <ReviewBlock custReview={currentItems} />
                    </div>}


                    <div className="section_cta">
                        {extractedReviews.length > itemsPerPage && <button aria-label='Previous' className="prev prod_nav_btn" onClick={handlePrevPage} disabled={currentPage === 1} style={{ backgroundImage: 'url(/images/colored_prev.png)' }}>
                        </button>}
                        {dlv(blockContent, 'links') && <ReviewDialog product={product} blockContent={blockContent} />}
                        {extractedReviews.length > itemsPerPage && <button aria-label='Next' className="next prod_nav_btn" onClick={handleNextPage} disabled={currentPage === totalPages} style={{ backgroundImage: 'url(/images/colored_next.png)' }}>
                        </button>}
                    </div>
                </div>
            </div>
        </div>
    )
}
