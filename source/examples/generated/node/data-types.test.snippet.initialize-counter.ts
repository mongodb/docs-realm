const MyObject = realm.write(() => {
    return realm.create( WithCounterSchema, { _id: new BSON.ObjectId(), counter: 0 } ); // initializing counter to 0
});
