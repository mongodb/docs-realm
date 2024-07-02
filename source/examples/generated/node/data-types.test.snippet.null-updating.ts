const MyObject1 = realm.write(() => {
    return realm.create( WithNullableCounterSchema, {_id: new BSON.ObjectId(), nullableCounter: 0 } ); // initializing counter to 0
});

const id = MyObject1._id // save the id for future reference

realm.write(() => {
    realm.create( WithNullableCounterSchema, { _id: id, nullableCounter: null }, UpdateMode.Modified ); // nullify the counter
});

realm.write(() => {
    realm.create( WithNullableCounterSchema, { _id: id, nullableCounter: 0 }, UpdateMode.Modified ); // re-initialize the counter to 0
});
