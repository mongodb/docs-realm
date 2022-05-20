for await (const change of plants.watch({
  operationType: "insert",
  "fullDocument.type": "perennial",
})) {
  // The change event will always represent a newly inserted perennial
  const {
    documentKey,
    fullDocument,
  } = change as Realm.Services.MongoDB.InsertEvent<Plant>;
  console.log(`new document: ${documentKey}`, fullDocument);
}