import React, { useState, useEffect } from 'react';
import RatingStar from '@/components/shared/RattingStar';
import { CalculateRating, calculateStarDistribution, calculateOverallCategoryDistribution } from '@/components/shared/CalculateRating';
import dlv from 'dlv';

export default function RatingChart({ styles, product, setFilter, selectedFilters, setSelectedFilters }) {
    const { ratingValue } = CalculateRating(product);
    const starCountsArray = calculateStarDistribution(dlv(product, 'reviews'));
    const overAll = calculateOverallCategoryDistribution(dlv(product, 'reviews'));

    const handleClickRating = (number) => {
        setSelectedFilters(prevFilters => {
            if (prevFilters.includes(number)) {
                return prevFilters.filter(rating => rating !== number);
            } else {
                return [...prevFilters, number];
            }
        });
    }

    useEffect(() => {
        setFilter(selectedFilters);
    }, [selectedFilters, setFilter]);

    return (
        <>
            <div className={`rating_chart`}>
                <div className={`total_rating rat_chrt_count`}>
                    <div className={`ttl_rating`}>{product?.overall_average_rating}</div>
                    <RatingStar ratings={product?.overall_average_rating} page='product-detail'/>
                    <span className={`ttl_review_count`}>{dlv(product, 'review_count', '')} Reviews</span>
                </div>

                <div className={`star_rating_summary`}>
                    {
                        starCountsArray.map((item, index) => {
                            const isSelected = selectedFilters.includes(item.stars);
                            return (
                                <div key={index} className={`star_rating_summaryitem`}>
                                    <div className={`star_rating_summary_filter`}>
                                        <label className={`star_rating_label`}>
                                            <span className={`star_rating_summary_number`} aria-hidden="true">{item.stars}</span>
                                            <span className={`star_rating_summary_filter_star`} aria-hidden="true">
                                                <svg className="wccom-star star-rating-summaryicon wccom-star__1" width="13" height="13"
                                                    viewBox="0 0 24 24" role="img" pointer-events="all">
                                                    <path
                                                        d="M11.6175 18.3126L17.4016 21.2832C17.9771 21.5788 18.6432 21.091 18.5352 20.4531L17.5256 14.4916L22.2421 9.44552C22.6687 8.98913 22.4178 8.24151 21.8023 8.13483L15.5158 7.04526L12.305 1.24251C12.006 0.702085 11.2291 0.702085 10.93 1.24251L7.71933 7.04526L1.43282 8.13483C0.817277 8.24151 0.566397 8.98913 0.992984 9.44552L5.70949 14.4916L4.69988 20.4531C4.59184 21.091 5.25798 21.5788 5.83352 21.2832L11.6175 18.3126Z"
                                                        fill={isSelected ? "#996600" : "#FFAB02"}></path>
                                                </svg>
                                            </span>
                                        </label>
                                    </div>
                                    <div className={`star_rating_summary_progress`} onClick={() => handleClickRating(item.stars)}>
                                        <div className={`progress_bar`}>
                                            <div className={`progress_bar__container`} style={{ backgroundColor: 'rgb(220, 220, 222)', }}>
                                                <div className={`progress_bar__filler`} style={{ backgroundColor: '#FF725E', width: `${item.percentage}%`, }}>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`star_rating_summary_percentage`}><span>{`${item.percentage}%`}</span></div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className={`rating_circle`}>
                    <div className={`rating_circle_outer`}>
                        <div className={`circle_inner`} style={{ background: `conic-gradient(#FF725E ${dlv(overAll, 'EasyToUse')}%, #E3E3E3 0 100%)` }}>
                            <span>{dlv(overAll, 'EasyToUse')}%</span>
                        </div>
                        <p className={`circle_text`}>Easy to Use</p>
                    </div>
                    <div className={`rating_circle_outer`}>
                        <div className={`circle_inner`} style={{ background: `conic-gradient(#FF725E ${dlv(overAll, 'GoodSupport')}%, #E3E3E3 0 100%)` }}>
                            <span>{dlv(overAll, 'GoodSupport')}%</span>
                        </div>
                        <p className={`circle_text`}>Good Support</p>
                    </div>
                    <div className={`rating_circle_outer`}>
                        <div className={`circle_inner`} style={{ background: `conic-gradient(#FF725E ${dlv(overAll, 'WorksWell')}%, #E3E3E3 0 100%)` }}>
                            <span>{dlv(overAll, 'WorksWell')}%</span>
                        </div>
                        <p className={`circle_text`}>Works Well</p>
                    </div>
                </div>
            </div>
        </>
    )
}
