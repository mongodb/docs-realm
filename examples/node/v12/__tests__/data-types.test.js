import Realm, { UpdateMode } from "realm";

import { ClassWithCounter } from "./models/models.js";

// This test exists to ensure that the JS model definition works that same way
// as the TS model definition. There are no snippets generated from this file,
// as it's the exact same code as what's in the TS file.

describe("Counter Updates", () => {
  test("testing normal methods", async () => {
    const realm = await Realm.open({
      schema: [ClassWithCounter],
    });

    const myObject = realm.write(() => {
      return realm.create(ClassWithCounter, { myCounter: 0 });
    });

    realm.write(() => {
      myObject.myCounter.increment();
      myObject.myCounter.value; // 1
      expect(myObject.myCounter.value).toBe(1);
      myObject.myCounter.increment(2);
      myObject.myCounter.value; // 3
      expect(myObject.myCounter.value).toBe(3);
      myObject.myCounter.decrement(2);
      myObject.myCounter.value; // 1
      expect(myObject.myCounter.value).toBe(1);
      myObject.myCounter.increment(-2);
      myObject.myCounter.value; // -1
      expect(myObject.myCounter.value).toBe(-1);
      myObject.myCounter.set(0); // reset counter value to 0

      expect(myObject.myCounter.value).toBe(0);
    });
  });

  test("testing nullability switching", async () => {
    const realm = await Realm.open({
      schema: [ClassWithCounter],
    });

    const myObject = realm.write(() => {
      return realm.create(ClassWithCounter, {
        nullableCounter: 0,
        myCounter: 1,
      });
    });

    const myID = myObject._id;
    expect(myObject.nullableCounter?.value).toBe(0);

    realm.write(() => {
      realm.create(
        ClassWithCounter,
        { _id: myID, nullableCounter: null },
        UpdateMode.Modified
      );
    });
    expect(myObject.nullableCounter).toBe(null);

    realm.write(() => {
      realm.create(
        ClassWithCounter,
        { _id: myID, nullableCounter: 0 },
        UpdateMode.Modified
      );
    });

    expect(myObject.nullableCounter?.value).toBe(0);
  });

  test("testing filtering", async () => {
    const realm = await Realm.open({
      schema: [ClassWithCounter],
    });

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
