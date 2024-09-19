import React, { useState } from 'react';
import RatingChart from './RatingChart';
import ReviewDialog from '@/components/shared/ReviewDialog';
import dlv from 'dlv';
import RatingStar from '@/components/shared/RattingStar';

function calculateStarRating(ratingsBreakdown) {
    const overallRatings = ratingsBreakdown.filter(rating => rating?.name === 'OverallRating');
    const totalRatings = overallRatings.reduce((total, rating) => total + parseFloat(rating.value), 0);
    const averageRating = totalRatings / overallRatings.length;
    const starRating = (averageRating / 5) * 5;
    return Number.isInteger(starRating) ? starRating : parseFloat(starRating.toFixed(1));
}

export default function CustomerReview({ product, blockContent, sarabun }) {
    const [helpful, setHelpful] = useState({});
    const [unHelpful, setUnHelpful] = useState({});
    const [showReviews, setShowReviews] = useState(5);
    const [filter, setFilter] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([])

    const handleClearFilters = () =>{
        setSelectedFilters([])
    }

    const handleUnHelpfull = (index) => {
        if (!helpful[index]) {
            setUnHelpful(prevCounts => ({
                ...prevCounts,
                [index]: (prevCounts[index] || 0) + 1
            }));
        } else {
            const updatedHelpful = { ...helpful };
            delete updatedHelpful[index];
            setHelpful(updatedHelpful);
            setUnHelpful(prevCounts => ({
                ...prevCounts,
                [index]: (prevCounts[index] || 0) + 1
            }));
        }
    };

    let Reviews = [];
    let reviewsDataLength = 0;
    try {
        Reviews = dlv(product, 'reviews.items');
        reviewsDataLength = Reviews.length;
    } catch (e) { }

    const handleLoadMore = () => {
        setShowReviews(prevCounts => prevCounts + 5);
    };

    const filteredReviews = filter.length > 0
        ? dlv(product, 'reviews.items', []).filter(review =>
            review.ratings_breakdown.some(rating => rating.name === 'OverallRating' && filter.includes(parseInt(rating.value)))
        ).slice(0, showReviews)
        : Reviews.slice(0, showReviews);

    const filteredReviewsCount = filter.length > 0
        ? dlv(product, 'reviews.items', []).filter(review =>
            review.ratings_breakdown.some(rating => rating.name === 'OverallRating' && filter.includes(parseInt(rating.value)))
        ).length
        : reviewsDataLength;

    return (
        <>
            <div id="review" className="section_padding review_main_sec">
                <div className='main_container'>
                    <div className={`dtl_pg_sec_hd`}>
                        {dlv(product, 'reviews.items.length') > 0 && <div className={`cnt_block`}>
                            <h2 className={`prod_sec_title primary_title ${sarabun}`}>
                                {dlv(product, 'reviews_heading')}
                            </h2>
                        </div>}
                        <ReviewDialog product={product} blockContent={blockContent} isBottom={true} sarabun={sarabun} />
                    </div>

                    {/* Ratings Chart */}
                    {dlv(product, 'review_count') > 0 && <RatingChart product={product} setFilter={setFilter} filter={filter} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />}

                    {dlv(product, 'review_count') > 0 && <div className={`customer_reviews prod_cust_review`}>
                        {filteredReviews.length > 0 && <div className={`ttl_review_count`}>
                            Showing 1-{filteredReviews.length} of {filteredReviewsCount} reviews <strong style={{fontWeight:'bold'}}>{`${filter?.length > 0 ? `${filter.join(' stars, ')}` : ''} ${filter?.length > 0 ? 'stars )' : ''}`}</strong> {selectedFilters.length > 0 && <strong onClick={handleClearFilters} className='clear_filters'>Clear Filter</strong>}
                        </div>
                        }
                        <ul>
                            {
                                filteredReviews.length > 0 ? filteredReviews.map((review, index) =>
                                    <li key={index} className={`review_item`} >
                                        <div className={`name_block customer_name_block`}>
                                            <p className={`title ${sarabun}`}>{review.nickname}</p>
                                        </div>
                                        <div className={'desc_block'}>
                                            <div className={'info_block'}>
                                                <RatingStar ratings={calculateStarRating(review.ratings_breakdown)} />
                                                <div className={`name_block`}>
                                                    <p className={`title ${sarabun}`}>{review.summary}</p>
                                                </div>
                                                <p className={`review_desc secondary_text`}>{review.text}</p>
                                            </div>
                                        </div>
                                    </li>
                                )
                                :
                                <>No <strong style={{fontWeight:'bold'}}>{filter.join(' stars, ')} stars</strong> Reviews Found {selectedFilters.length > 0 && <strong onClick={handleClearFilters} className='clear_filters'>Clear Filter</strong>}</> 
                            }
                        </ul>
                        {
                            showReviews < filteredReviewsCount &&
                            <div className="section_cta">
                                <button className={`load_cta primary_link`} onClick={handleLoadMore}>Load More</button>
                            </div>
                        }
                    </div>}
                </div>
            </div>
        </>
    );
}
