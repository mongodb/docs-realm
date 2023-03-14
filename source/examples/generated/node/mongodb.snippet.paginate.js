// Paginates through list of plants
// in ascending order by plant name (A -> Z)
async function paginateCollectionAscending(
  collection,
  nPerPage,
  startValue
) {
  const includeFirstElement = !startValue;

  if (!startValue) {
    startValue = (
      await plants.aggregate([
        { $match: {} },
        { $sort: { name: 1 } },
        { $limit: 1 },
      ])
    )[0].name;
  }
  const results = await collection.aggregate([
    {
      $match: {
        name: { [includeFirstElement ? "$gte" : "$gt"]: startValue },
      },
    },
    { $sort: { name: 1 } },
    { $limit: nPerPage },
  ]);

  return results;
}
// Number of results to show on each page
let resultsPerPage = 3;

const pageOneResults = await paginateCollectionAscending(
  plants,
  resultsPerPage
);

const pageTwoStartValue = pageOneResults[pageOneResults.length - 1].name;
const pageTwoResults = await paginateCollectionAscending(
  plants,
  resultsPerPage,
  pageTwoStartValue
);

// ... can keep paginating for as many plants as there are in the collection
