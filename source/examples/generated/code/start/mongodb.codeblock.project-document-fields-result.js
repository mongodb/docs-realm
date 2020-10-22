    [
      { "name": "venus flytrap", "storeNumber": "42" },
      { "name": "thai basil", "storeNumber": "42" },
      { "name": "helianthus", "storeNumber": "42" },
      { "name": "wisteria lilac", "storeNumber": "42" },
      { "name": "daffodil", "storeNumber": "42" },
      { "name": "sweet basil", "storeNumber": "47" }
    ]
    // :code-block-end
  )
});
test("Add Fields to Documents", async () => {
  const plants = await getPlantsCollection();
  // :code-block-start: add-fields-to-documents
  const result = await plants.aggregate([
    {
      $addFields: {
        storeNumber: {
          $arrayElemAt: [{ $split: ["$_partition", " "] }, 1],
        },
      },
    },
  ]);
  console.log(result);