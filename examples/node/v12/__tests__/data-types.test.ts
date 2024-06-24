import Realm, { BSON, Counter, ObjectSchema, UpdateMode, List } from "realm";


describe("Counter Updates", () => {
    test("testing normal methods", async () => {
        // :snippet-start:declare-counter-schema
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
        // :snippet-end:

        const realm = await Realm.open({
            schema: [WithCounterSchema],
        });

        const MyObject = realm.write(() => {
            return realm.create( WithCounterSchema, { _id: new BSON.ObjectId(), counter: 0 } ); // initializing counter to 0
        });

        realm.write(() => {
            MyObject.counter.increment();
            MyObject.counter.value; // 1

            expect(MyObject.counter.value).toBe(1)

            MyObject.counter.increment(2);
            MyObject.counter.value; // 3

            expect(MyObject.counter.value).toBe(3)

            MyObject.counter.decrement(2);
            MyObject.counter.value; // 1

            expect(MyObject.counter.value).toBe(1)

            MyObject.counter.increment(-2);
            MyObject.counter.value; // -1

            expect(MyObject.counter.value).toBe(-1)

            MyObject.counter.set(0); // reset counter value to 0

            expect(MyObject.counter.value).toBe(0)
        });

        realm.close()
    });

    test("testing normal methods without asserts", async () => {
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

        const realm = await Realm.open({
            schema: [WithCounterSchema],
        });


        // :snippet-start:initialize-counter
        const MyObject = realm.write(() => {
            return realm.create( WithCounterSchema, { _id: new BSON.ObjectId(), counter: 0 } ); // initializing counter to 0
        });
        // :snippet-end:

        realm.write(() => {
            // :snippet-start:update-counter
            MyObject.counter.increment();
            MyObject.counter.value; // 1
            MyObject.counter.increment(2);
            MyObject.counter.value; // 3
            MyObject.counter.decrement(2);
            MyObject.counter.value; // 1
            MyObject.counter.increment(-2);
            MyObject.counter.value; // -1

            MyObject.counter.set(0); // reset counter value to 0
            // :snippet-end:
        });

        realm.close()
    });



    test("testing nullability switching", async () => {
        class WithNullableCounterSchema extends Realm.Object<WithNullableCounterSchema> {
            _id!: BSON.ObjectId;
            nullableCounter?: Counter | null; // introduce the nullableCounter in the interface
    
            static schema: ObjectSchema = {
                name: "WithNullableCounterSchema",
                primaryKey: "_id",
                properties: {
                    _id: { type: "objectId", default: () => new BSON.ObjectId() },
                    nullableCounter: "counter?", // make the presentation optional
                    // or nullableCounter: { type: "int", presentation: "counter" }
                },
            }
            
        };

        const realm = await Realm.open({
            schema: [WithNullableCounterSchema],
        });

        const MyObject1 = realm.write(() => {
            return realm.create( WithNullableCounterSchema, {_id: new BSON.ObjectId(), nullableCounter: 0 } ); // initializing counter to 0
        });

        const id = MyObject1._id // save the id for future reference

        expect(MyObject1.nullableCounter?.value).toBe(0)

        realm.write(() => {
            realm.create( WithNullableCounterSchema, { _id: id, nullableCounter: null }, UpdateMode.Modified ); // nullify the counter
        });

        expect(MyObject1.nullableCounter).toBe(null)

        realm.write(() => {
            realm.create( WithNullableCounterSchema, { _id: id, nullableCounter: 0 }, UpdateMode.Modified ); // re-initialize the counter to 0
        });

        expect(MyObject1.nullableCounter?.value).toBe(0)

        realm.close()
    });

    
    test("testing nullability switching without asserts", async () => {
        class WithNullableCounterSchema extends Realm.Object<WithNullableCounterSchema> {
            _id!: BSON.ObjectId;
            nullableCounter?: Counter | null; // introduce the nullableCounter in the interface
    
            static schema: ObjectSchema = {
                name: "WithNullableCounterSchema",
                primaryKey: "_id",
                properties: {
                    _id: { type: "objectId", default: () => new BSON.ObjectId() },
                    nullableCounter: "counter?", // make the presentation optional
                    // or nullableCounter: { type: "int", presentation: "counter" }
                },
            }
            
        };

        const realm = await Realm.open({
            schema: [WithNullableCounterSchema],
        });

        // :snippet-start:null-updating
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
        // :snippet-end:

        realm.close()
    });


    test("testing filtering", async () => {
        class WithCounterSchema extends Realm.Object<WithCounterSchema> {
            _id!: BSON.ObjectId;
            counter!: Counter; // define a non-nullable counter property
    
            static schema: ObjectSchema = {
                name: "WithCounterSchema",
                primaryKey: "_id",
                properties: {
                    // examples of both declaration methods:
                    _id: { type: "objectId", default: () => new BSON.ObjectId() },
                    counter: { type: "int", presentation: "counter", default: 0 },
                },
            }
        };

        const realm = await Realm.open({
            schema: [WithCounterSchema],
        });

        const MyObject1 = realm.write(() => {
            return realm.create( WithCounterSchema, {_id: new BSON.ObjectId(), counter: 0 } ); // Object 1, counter = 0
        });

        const MyObject2 = realm.write(() => {
            return realm.create( WithCounterSchema, {_id: new BSON.ObjectId(), counter: 1 } ); // Object 2, counter = 1
        });

        const MyObject3 = realm.write(() => {
            return realm.create( WithCounterSchema, {_id: new BSON.ObjectId(), counter: 2 } ); // Object 3, counter = 2
        });

        const Objects = realm.objects('WithCounterSchema'); // creates list of objects

        let filtered_objects = Objects.filtered('counter >= $0', MyObject2.counter.value);

        let unfiltered_expected = [MyObject1, MyObject2, MyObject3]
        let filtered_expected = [MyObject2, MyObject3]

        expect(JSON.stringify(Objects)).toMatch(JSON.stringify(unfiltered_expected));
        expect(JSON.stringify(filtered_objects)).toMatch(JSON.stringify(filtered_expected));

        realm.close();
    });

    test("testing filtering without asserts", async () => {
        class WithCounterSchema extends Realm.Object<WithCounterSchema> {
            _id!: BSON.ObjectId;
            counter!: Counter; // define a non-nullable counter property
    
            static schema: ObjectSchema = {
                name: "WithCounterSchema",
                primaryKey: "_id",
                properties: {
                    // examples of both declaration methods:
                    _id: { type: "objectId", default: () => new BSON.ObjectId() },
                    counter: { type: "int", presentation: "counter", default: 0 },
                },
            }
        };

        const realm = await Realm.open({
            schema: [WithCounterSchema],
        });

        // :snippet-start:filtering-with-counter
        const filtered_out = realm.write(() => {
            return realm.create( WithCounterSchema, {_id: new BSON.ObjectId(), counter: 0 } ); // Object 1, counter = 0
        });

        const threshold = realm.write(() => {
            return realm.create( WithCounterSchema, {_id: new BSON.ObjectId(), counter: 1 } ); // Object 2, counter = 1
        });

        const passes_filter = realm.write(() => {
            return realm.create( WithCounterSchema, {_id: new BSON.ObjectId(), counter: 2 } ); // Object 3, counter = 2
        });

        const Objects = realm.objects('WithCounterSchema'); // creates list of objects

        let filtered_objects = Objects.filtered('counter >= $0', threshold.counter.value);
        // :snippet-end:

        realm.close();
    });
});