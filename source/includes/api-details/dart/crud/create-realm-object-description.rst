Once you've opened a database, you can create objects within it using a
:flutter-sdk:`Realm.write() <realm/Realm/write.html>` transaction block.

.. code-block:: dart

   realm.write((){
     // ...write data to realm
   });

You can also return values from the write transaction callback function.

.. warning:: Write RealmObjects to One Realm File

   You can only write ``RealmObjects`` to a single realm file.
   If you already wrote a ``RealmObject`` to one realm file,
   the SDK throws a ``RealmException`` if you try to write it to another database.
