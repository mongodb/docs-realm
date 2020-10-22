for await (const change of plants.watch()) {
  const { operationType } = change;
  switch (operationType) {
    case "insert": {
      const { documentKey, fullDocument } = change;
      console.log(`new document: ${documentKey}`, fullDocument);
      break;
    }
    case "update": {
      const { documentKey, fullDocument } = change;
      console.log(`updated document: ${documentKey}`, fullDocument);
      break;
    }
    case "replace": {
      const { documentKey, fullDocument } = change;
      console.log(`replaced document: ${documentKey}`, fullDocument);
      break;
    }
    case "delete": {
      const { documentKey } = change;
      console.log(`deleted document: ${documentKey}`);
      break;
    }
  }