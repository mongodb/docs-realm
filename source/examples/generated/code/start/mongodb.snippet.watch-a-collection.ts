for await (const change of plants.watch()) {
  const { operationType } = change;
  switch (operationType) {
    case "insert": {
      const {
        documentKey,
        fullDocument,
      } = change as Realm.Services.MongoDB.InsertEvent<Plant>;
      console.log(`new document with _id: ${documentKey}`, fullDocument);
      break;
    }
    case "update": {
      const {
        documentKey,
        fullDocument,
      } = change as Realm.Services.MongoDB.UpdateEvent<Plant>;
      console.log(`updated document: ${documentKey}`, fullDocument);
      break;
    }
    case "replace": {
      const {
        documentKey,
        fullDocument,
      } = change as Realm.Services.MongoDB.ReplaceEvent<Plant>;
      console.log(`replaced document: ${documentKey}`, fullDocument);
      break;
    }
    case "delete": {
      const { documentKey } = change as Realm.Services.MongoDB.DeleteEvent<
        Plant
      >;
      console.log(`deleted document: ${documentKey}`);
      break;
    }
  }
}