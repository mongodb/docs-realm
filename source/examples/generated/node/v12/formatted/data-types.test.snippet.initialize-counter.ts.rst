.. code-block:: typescript

   const myObject = realm.write(() => {
     return realm.create(ClassWithCounter, { myCounter: 0 });
   });
