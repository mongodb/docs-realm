.. code-block:: typescript

   class Person extends Realm.Object<Person> {
     name!: string;
     age?: number;
     birthday?: Date;

     static schema: ObjectSchema = {
       name: 'Person',
       properties: {
         name: 'string',
         age: {
           type: 'int',
           optional: true,
         },
         birthday: {
           type: 'date',
           optional: true,
         },
       },
     };
   }
