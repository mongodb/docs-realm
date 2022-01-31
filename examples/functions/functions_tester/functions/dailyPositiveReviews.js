// :snippet-start: daily-positive-reviews
exports = function () {
  let midnightToday = new Date();
  midnightToday.setHours(0, 0, 0, 0);
  midnightToday = midnightToday.getTime();

  let midnightYesterday = new Date();
  midnightYesterday.setDate(midnightYesterday.getDate() - 1);
  midnightYesterday.setHours(0, 0, 0, 0);
  midnightYesterday = midnightYesterday.getTime();

  const mongodb = context.services.get("mongodb-atlas");
  const reviews = mongodb.db("ExampleDB").collection("reviews");
  const positiveRecentReviews = reviews.aggregate({
    $match: {
      rating: {
        $gte: 3,
      },
      createdAt: {
        $gte: midnightYesterday,
        $lt: midnightToday,
      },
    },
  });
  // ... do stuff with the positive reviews ...
};
// :snippet-end:
