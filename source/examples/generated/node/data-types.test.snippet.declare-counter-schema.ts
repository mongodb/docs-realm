    class WithCounterSchema extends Realm.Object<WithCounterSchema> {
        _id!: BSON.ObjectId;
        counter!: Counter; // define a non-nullable counter property
        nullableCounter?: Counter | null; // define a nullable counter property

        static schema: ObjectSchema = {
            name: "WithCounterSchema",
            primaryKey: "_id",
            properties: {
                // examples of both declaration methods:
                _id: { type: "objectId", default: () => new BSON.ObjectId() },
                counter: { type: "int", presentation: "counter", default: 0 },
                nullableCounter: "counter?",
            },
        }
    };
