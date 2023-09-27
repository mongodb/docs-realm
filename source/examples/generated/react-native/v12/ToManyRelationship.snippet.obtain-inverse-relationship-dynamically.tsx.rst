.. code-block:: typescript

   const getLinkedManufacturer = (car: LinkedCar): string => {
     const manufacturer = car.linkingObjects<ToManyManufacturer>(
       'ToManyManufacturer',
       'cars',
     )[0];

     return manufacturer.name;
   };
