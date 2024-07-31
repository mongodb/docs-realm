.. code-block:: typescript

   const myObject = realm.write(() => {
     return realm.create(ClassWithCounter, {
       nullableCounter: 0,
       myCounter: 1,
     });
   });

   const myID = myObject._id;

   realm.write(() => {
     realm.create(
       ClassWithCounter,
       { _id: myID, nullableCounter: null },
       UpdateMode.Modified
     );
   });

   realm.write(() => {
     realm.create(
       ClassWithCounter,
       { _id: myID, nullableCounter: 0 },
       UpdateMode.Modified
     );
   });
