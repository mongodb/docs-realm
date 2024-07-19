Create a TypeScript class that extends :js-sdk:`Realm.Object
<classes/Realm.Object.html>`.

Define a static ``schema`` object of type :js-sdk:`ObjectSchema
<types/Realm.ObjectSchema.html>`. This schema includes a ``name`` property,
which becomes the table name in the database. The schema should include a
``properties`` array, which is an array of objects of type
:js-sdk:`PropertiesTypes <types/Realm.PropertiesTypes.html>`. Each object in
this array contains a string key that becomes the name of the property, and
a :js-sdk:`PropertySchema <types/Realm.PropertySchema.html>` that provides
additional details about the property, such as its type and any special
behaviors it should have.
