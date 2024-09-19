
import React from 'react';
import ServiceListing from './ServiceListing';
import FeaturedService from './FeaturedService';

export default function MagentoServicesListing({serviceList, featService, buyNowButton, pageName}) {
    
    return (
        <>
            <div className="services_container">
                {/* Featured Service Listing */}
                <FeaturedService featService={featService} products={serviceList} />
                {/* Basic Service Listing */}
                <ServiceListing serviceList={serviceList} buyNowButton={buyNowButton} />
            </div>

        </>
    )
}
