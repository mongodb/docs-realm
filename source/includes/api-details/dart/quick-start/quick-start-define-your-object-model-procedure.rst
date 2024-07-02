Your application's **data model** defines the structure of data stored within
the database. You can define your application's data model via Dart
classes in your application code with an SDK object schema.
You then have to generate the :flutter-sdk:`RealmObjectBase <realm/RealmObjectBase-mixin.html>`
class that's used within your application.

For more information, refer to :ref:`Define an Object Schema 
<sdks-define-object-schema>`.

**Create a Model Class**

Add an SDK model class. Give your class a private name
(starting with ``_``), such as a file ``car.dart`` with a class
``_Car``.

**Generate an SDK Object Class**

Generate a RealmObject class ``Car`` from the data model class ``_Car``:

.. code-block::

   dart run realm_dart generate

Running this creates a ``Car`` class in a ``car.realm.dart`` file
located in the directory where you defined the model class. This ``Car``
class is public and part of the same library as the ``_Car`` data model
class. The generated ``Car`` class is what's used throughout your
application.

**Watch for Changes to the Model (Optional)**

You can watch your data model class to generate a new ``Car`` class
whenever there's a change to ``_Car``:

.. code-block::

   dart run realm_dart generate --watch
