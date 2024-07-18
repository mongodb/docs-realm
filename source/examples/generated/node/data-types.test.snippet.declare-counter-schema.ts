class myClass extends Realm.Object<myClass> {
    _id!: BSON.ObjectId;
    myCounter!: Counter;
    nullableCounter?: Counter | null;

    static schema: ObjectSchema = {
        name: "myClass",
        primaryKey: "_id",
        properties: {
            _id: { type: "objectId", default: () => new BSON.ObjectId() },
            myCounter: { type: "int", presentation: "counter" }, 
            // or myCounter: "counter"
            nullableCounter: { type: "int", presentation: "counter", optional: true }, 
            // or nullableCounter: "counter?" 
        },
    }
};
