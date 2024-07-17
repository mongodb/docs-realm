class myClass extends Realm.Object {
    _id!;
    myCounter!;
    nullableCounter;

    static schema = {
        name: "myClass",
        primaryKey: "_id",
        properties: {
            _id: { type: "objectId", default: () => new BSON.ObjectId() },
            myCounter: { type: "int", presentation: "counter" }, // or myCounter: "counter"
            nullableCounter: { type: "int", presentation: "counter", optional: true }, // or nullableCounter: "counter?" 
        },
    }
};
