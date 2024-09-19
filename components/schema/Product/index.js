import Script from "next/script";
import dlv from 'dlv';

const ProductSchema = ({ product }) => {
    // Initialize variables to store the highest and lowest ratings
    let highestRating = 0;
    let lowestRating = 5; // Assuming the lowest possible rating is 5

    // Iterate through each review to find the highest and lowest ratings
    dlv(product, 'reviews.items') && dlv(product, 'reviews.items').forEach((review) => {
        review.ratings_breakdown.forEach((rating) => {
            const value = parseInt(rating.value, 10);
            if (value > highestRating) {
                highestRating = value;
            }
            if (value < lowestRating) {
                lowestRating = value;
            }
        });
    });

    // Calculate bestRating, ratingValue, and worstRating
    const bestRating = highestRating.toString();
    const worstRating = lowestRating.toString();
    const ratingValue = (highestRating + lowestRating) / 2;

    // Map the reviews array to the desired format
    const reviews = dlv(product, 'reviews.items') && dlv(product, 'reviews.items').map((review) => ({
        "@type": "Review",
        "author": dlv(review, 'nickname'),
        "datePublished": dlv(review, 'created_at'),
        "reviewBody": dlv(review, 'text'),
        "name": dlv(review, 'summary'),
        "reviewRating": {
            "@type": "Rating",
            "bestRating": bestRating,
            "ratingValue": ratingValue,
            "worstRating": worstRating
        }
    }));

    return (
        <Script type="application/ld+json" id="product-schema">
            {`
            {
                "@context": "https://schema.org",
                "@type": "Product",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "${highestRating}",
                  "reviewCount": "${dlv(product, 'review_count')}"
                },
                "description": "${dlv(product, 'meta_description')}",
                "name": "${dlv(product, 'name')}",
                "image": "${dlv(product, 'image.url')}",
                "offers": {
                  "@type": "Offer",
                  "availability": "https://schema.org/InStock",
                  "price": "${dlv(product, "special_price") ? dlv(product, "special_price") : dlv(product, "price.regularPrice.amount.value")}",
                  "priceCurrency": "${dlv(product, "price.regularPrice.amount.currency")}"
                },
                "review": [
                  ${JSON.stringify(reviews, null, 2)}
                ]
              }
            `}
        </Script>
    );
};

export default ProductSchema;
