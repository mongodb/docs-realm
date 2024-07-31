import Realm, { UpdateMode } from "realm";

import { ClassWithCounter } from "./models/models.ts";

describe("Counter Updates", () => {
  test("testing normal methods", async () => {
    const realm = await Realm.open({
      schema: [ClassWithCounter],
    });

    // :snippet-start:initialize-counter
    const myObject = realm.write(() => {
      return realm.create(ClassWithCounter, { myCounter: 0 });
    });
    // :snippet-end:

    realm.write(() => {
      // :snippet-start:update-counter
      myObject.myCounter.increment();
      myObject.myCounter.value; // 1
      expect(myObject.myCounter.value).toBe(1); // :remove:
      myObject.myCounter.increment(2);
      myObject.myCounter.value; // 3
      expect(myObject.myCounter.value).toBe(3); // :remove:
      myObject.myCounter.decrement(2);
      myObject.myCounter.value; // 1
      expect(myObject.myCounter.value).toBe(1); // :remove:
      myObject.myCounter.increment(-2);
      myObject.myCounter.value; // -1
      expect(myObject.myCounter.value).toBe(-1); // :remove:
      myObject.myCounter.set(0); // reset counter value to 0
      // :snippet-end:
      expect(myObject.myCounter.value).toBe(0);
    });
  });

  test("testing nullability switching", async () => {
    const realm = await Realm.open({
      schema: [ClassWithCounter],
    });

    // :snippet-start:null-updating
    const myObject = realm.write(() => {
      return realm.create(ClassWithCounter, {
        nullableCounter: 0,
        myCounter: 1,
      });
    });

    const myID = myObject._id;
    expect(myObject.nullableCounter?.value).toBe(0); // :remove:

    realm.write(() => {
      realm.create(
        ClassWithCounter,
        { _id: myID, nullableCounter: null },
        UpdateMode.Modified
      );
    });
    expect(myObject.nullableCounter).toBe(null); // :remove:

    realm.write(() => {
      realm.create(
        ClassWithCounter,
        { _id: myID, nullableCounter: 0 },
        UpdateMode.Modified
      );
    });
    // :snippet-end:

    expect(myObject.nullableCounter?.value).toBe(0);
  });

  test("testing filtering", async () => {
    const realm = await Realm.open({
      schema: [ClassWithCounter],
    });

    // :snippet-start:filtering-with-counter
    const belowThreshold = realm.write(() => {
      return realm.create(ClassWithCounter, { myCounter: 0 });
    });

    const atThreshold = realm.write(() => {
      return realm.create(ClassWithCounter, { myCounter: 1 });
    });

    const aboveThreshold = realm.write(() => {
      return realm.create(ClassWithCounter, { myCounter: 2 });
    });

    const allObjects = realm.objects("ClassWithCounter");

    let filteredObjects = allObjects.filtered(
      "myCounter >= $0",
      atThreshold.myCounter.value
    );
    // :snippet-end:

    let unfilteredExpected = [belowThreshold, atThreshold, aboveThreshold];
    let filteredExpected = [atThreshold, aboveThreshold];

    expect(JSON.stringify(allObjects)).toMatch(
      JSON.stringify(unfilteredExpected)
    );
    expect(JSON.stringify(filteredObjects)).toMatch(
      JSON.stringify(filteredExpected)
    );
  });
});
