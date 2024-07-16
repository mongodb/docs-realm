import Realm, { BSON, Counter, ObjectSchema, UpdateMode } from "realm";

// :snippet-start:declare-counter-schema
class myClass extends Realm.Object<myClass> {
    _id!: BSON.ObjectId;
    myCounter!: Counter;
    nullableCounter?: Counter | null;

    static schema: ObjectSchema = {
        name: "myClass",
        primaryKey: "_id",
        properties: {
            _id: { type: "objectId", default: () => new BSON.ObjectId() },
            myCounter: { type: "int", presentation: "counter" }, // or myCounter: "counter"
            nullableCounter: { type: "int", presentation: "counter", optional: true }, // or nullableCounter: "counter?" 
        },
    }
};
// :snippet-end:

const realm = await Realm.open({
    schema: [myClass],
});

describe("Counter Updates", () => {
    test("testing normal methods", async () => {

        // :snippet-start:initialize-counter
        const myObject = realm.write(() => {
            return realm.create( myClass, { myCounter: 0 } );
        });
        // :snippet-end:

        realm.write(() => {
            // :snippet-start:update-counter
            myObject.myCounter.increment();
            myObject.myCounter.value; // 1
            expect(myObject.myCounter.value).toBe(1) // :remove:
            myObject.myCounter.increment(2);
            myObject.myCounter.value; // 3
            expect(myObject.myCounter.value).toBe(3) // :remove:
            myObject.myCounter.decrement(2);
            myObject.myCounter.value; // 1
            expect(myObject.myCounter.value).toBe(1) // :remove:
            myObject.myCounter.increment(-2);
            myObject.myCounter.value; // -1
            expect(myObject.myCounter.value).toBe(-1) // :remove:
            myObject.myCounter.set(0); // reset counter value to 0
            // :snippet-end:
            expect(myObject.myCounter.value).toBe(0)
        });

        realm.close()
    });

    test("testing nullability switching", async () => {

        // :snippet-start:null-updating
        const myObject = realm.write(() => {
            return realm.create( myClass, { nullableCounter: 0 } );
        });

        const myID = myObject._id
        expect(myObject.nullableCounter?.value).toBe(0) // :remove:

        realm.write(() => {
            realm.create( myClass, { _id: myID, nullableCounter: null }, UpdateMode.Modified );
        });
        expect(myObject.nullableCounter).toBe(null) // :remove:

        realm.write(() => {
            realm.create( myClass, { _id: myID, nullableCounter: 0 }, UpdateMode.Modified );
        });
        // :snippet-end:

        expect(myObject.nullableCounter?.value).toBe(0)

    });

    test("testing filtering", async () => {

        // :snippet-start:filtering-with-counter
        const belowThreshold = realm.write(() => {
            return realm.create( myClass, { myCounter: 0 } );
        });

        const atThreshold = realm.write(() => {
            return realm.create( myClass, { myCounter: 1 } );
        });

        const aboveThreshold = realm.write(() => {
            return realm.create( myClass, { myCounter: 2 } );
        });

        const allObjects = realm.objects('myClass');

        let filteredObjects = allObjects.filtered('counter >= $0', atThreshold.myCounter.value);
        // :snippet-end:

        let unfilteredExpected = [belowThreshold, atThreshold, aboveThreshold]
        let filteredExpected = [atThreshold, aboveThreshold]

        expect(JSON.stringify(allObjects)).toMatch(JSON.stringify(unfilteredExpected));
        expect(JSON.stringify(filteredObjects)).toMatch(JSON.stringify(filteredExpected));

    });
});