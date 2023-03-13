async function paginateCollectionAscending(
  collection,
  startValue,
  nPerPage,
  start
) {
  const results = await collection.aggregate([
    { $match: { name: { [start ? "$gte" : "$gt"]: startValue } } },
    { $sort: { name: 1 } },
    { $limit: nPerPage },
  ]);

  return results;
}
// Number of results to show on each page
let resultsPerPage = 3;
// Get smallest element in collection
const startValue = (
  await plants.aggregate([
    { $match: {} },
    { $sort: { name: 1 } },
    { $limit: 1 },
  ])
)[0].name;
console.log("start val:", startValue);

const pageOneResults = await paginateCollectionAscending(
  plants,
  startValue,
  resultsPerPage,
  true
);

const pageTwoStartValue = pageOneResults[pageOneResults.length - 1].name;
const pageTwoResults = await paginateCollectionAscending(
  plants,
  pageTwoStartValue,
  resultsPerPage,
  false
);

// ... can keep paginating for as many plants as there are in the collection
