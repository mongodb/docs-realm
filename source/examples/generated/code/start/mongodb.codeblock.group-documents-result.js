    [
      { _id: "annual", numItems: 1 },
      { _id: "perennial", numItems: 5 },
    ]
    // :code-block-end
  );
});

test("Project Document Fields", async () => {
  const plants = await getPlantsCollection();
  // :code-block-start: project-document-fields
  const result = await plants.aggregate([
    {
      $project: {
        _id: 0,
        name: 1,
        storeNumber: {
          $arrayElemAt: [{ $split: ["$_partition", " "] }, 1],
        },
      },
    },
  ]);
  console.log(result);