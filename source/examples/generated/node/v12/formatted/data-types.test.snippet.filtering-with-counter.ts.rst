.. code-block:: typescript

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
