import React, { useState } from 'react'
import ReviewBlock from '../Customer/ReviewBlock';
import SectionCta from '@/components/global/SectionCta';


export default function ServicesReview({serviceReview, sarabun}) {
    

    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(serviceReview.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, serviceReview.length);
    const currentItems = serviceReview.slice(startIndex, endIndex);

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
    return (
        <div className="section_padding">
            <div className="main_container">
                <div className="customer_container prod_dtl_cust_review">
                    <h2 className={`${sarabun} primary_title`}>
                        Reviews & Ratings <span className="review_count">({serviceReview.length})</span>
                    </h2>
                    <div className="reviews">
                        {currentItems.map((item) => (
                            <div className="reviews_inner">

                                <ReviewBlock key={item.id} custReview={[item]} />

                            </div>
                        ))}
                    </div>

                    <div className="section_cta">
                        <button className="prev prod_nav_btn" onClick={handlePrevPage} disabled={currentPage === 1} style={{ backgroundImage: 'url(/images/colored_prev.png)' }}>
                        </button>
                        <SectionCta props="Submit a Review" ctaClass="secondary_cta" url={''} />
                        <button className="next prod_nav_btn" onClick={handleNextPage} disabled={currentPage === totalPages} style={{ backgroundImage: 'url(/images/colored_next.png)' }}>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
