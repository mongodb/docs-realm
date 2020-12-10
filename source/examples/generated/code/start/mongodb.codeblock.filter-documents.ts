const perennials: Plant[] = await plants.aggregate([
  { $match: { type: { $eq: "perennial" } } },
]);
console.log(perennials);