import dlv from "dlv";

export function CalculateRating(product) {
  const review_count = dlv(product, 'reviews.items.length', 1);

  let highestRating = 0;
  let lowestRating = 5; // Assuming the lowest possible rating is 5

  try {
    const reviews = dlv(product, 'reviews.items') || [];

    if (reviews && reviews.length > 0) {
      // Iterate through each review to find the highest and lowest ratings
      reviews.forEach((review) => {
        if (dlv(review, 'ratings_breakdown')) {
          dlv(review, 'ratings_breakdown').forEach((rating) => {
            if (rating?.name === 'OverallRating') {
              const value = parseInt(rating.value, 10);
              highestRating += value;
              if (value < lowestRating) {
                lowestRating = value;
              }
            }
          });
        }
      });
    }
  } catch (e) { }

  // Calculate bestRating, ratingValue, and worstRating
  const bestRating = highestRating.toString();
  const worstRating = lowestRating.toString();
  const numRatings = review_count || 1;
  let ratingValue = (highestRating / numRatings).toFixed(1);
  if (ratingValue == '0.0') {
    ratingValue = 0;
  }

  return { bestRating, worstRating, ratingValue };
}

export function calculateStarDistribution(ratings) {
  // Initialize counters for each star rating
  const starCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  // Iterate over each rating item and count the star ratings
  ratings.items.forEach(item => {
    item.ratings_breakdown.forEach(rating => {
      if (rating?.name === 'OverallRating') {
        const stars = parseInt(rating.value, 10);
        if (starCounts[stars] !== undefined) {
          starCounts[stars] += 1;
        }
      }
    });
  });

  // Calculate total number of ratings
  const totalRatings = Object.values(starCounts).reduce((total, count) => total + count, 0);

  // Calculate the percentage for each star rating
  const starPercentages = {};
  for (let stars in starCounts) {
    const count = starCounts[stars];
    const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
    starPercentages[stars] = Math.round(percentage).toString();
  }

  // Convert starCounts to an array of key-value pairs and map over it
  const starCountsArray = Object.entries(starCounts).map(([stars, count]) => ({
    stars: parseInt(stars),
    count: count,
    percentage: starPercentages[stars]
  }));

  // Reverse the order to 5, 4, 3, 2, 1
  return starCountsArray.reverse();
}

export function calculateOverallCategoryDistribution(ratings) {
  // Initialize counters for each category
  const categoryCounts = {
    GoodSupport: 0,
    EasyToUse: 0,
    WorksWell: 0,
  };

  // Initialize the total ratings count for each category
  let totalQualityRatings = 0;
  let totalPriceRatings = 0;
  let totalValueRatings = 0;

  // Iterate over each rating item and count the category ratings
  ratings.items.forEach(item => {
    item.ratings_breakdown.forEach(rating => {
      const value = parseInt(rating.value, 10);
      if (rating.name === "GoodSupport") {
        categoryCounts.GoodSupport += value;
        totalQualityRatings += 1;
      } else if (rating.name === "EasyToUse") {
        categoryCounts.EasyToUse += value;
        totalPriceRatings += 1;
      } else if (rating.name === "WorksWell") {
        categoryCounts.WorksWell += value;
        totalValueRatings += 1;
      }
    });
  });

  // Calculate the average ratings for each category
  const categoryAverages = {
    GoodSupport: totalQualityRatings > 0 ? categoryCounts.GoodSupport / totalQualityRatings : 0,
    EasyToUse: totalPriceRatings > 0 ? categoryCounts.EasyToUse / totalPriceRatings : 0,
    WorksWell: totalValueRatings > 0 ? categoryCounts.WorksWell / totalValueRatings : 0,
  };

  // Calculate the percentage for each category
  const categoryPercentages = {};
  for (let category in categoryAverages) {
    const average = categoryAverages[category];
    const percentage = average > 0 ? (average / 5) * 100 : 0;
    categoryPercentages[category] = Math.round(percentage).toString();
  }

  return categoryPercentages;
}