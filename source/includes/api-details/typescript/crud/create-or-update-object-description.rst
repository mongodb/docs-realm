To upsert an object, call :js-sdk:`Realm.create() <classes/Realm-1.html#create>` 
with the update mode set to ``modified``. The operation either inserts a 
new object with the given primary key or updates an existing object that 
already has that primary key.
