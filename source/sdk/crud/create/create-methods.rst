.. _sdks-create-object-methods:

=====================
Create Object Methods
=====================

.. meta::
   :description: Learn about performing write transactions and the different ways to create objects with Atlas Device SDK.
   :keywords: Realm, C++ SDK, Flutter SDK, Kotlin SDK, Java SDK, Node.js SDK, Swift SDK, code example

.. facet::
  :name: genre
  :values: reference

.. facet::
   :name: programming_language
   :values: cpp, csharp, dart, java, javascript/typescript, kotlin, objective-c, swift

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 2
   :class: singlecol

.. tabs-selector:: drivers

This page describes the concepts of write transactions and managed objects in 
a database, then explains how to create and persist a new object to a local or 
synced database using Atlas Device SDK. To learn more about object models and 
how to define them, refer to :ref:`sdks-object-models`.

You can create objects whose object type is managed by the database instance. 
For more information, refer to 
:ref:`sdks-configure-and-open-database` or 
:ref:`sdks-configure-and-open-synced-database`.

.. note:: Write to a Synced Database

   The syntax to write a new object to the database is the same for a local or
   a synced database. However, there are additional considerations that determine
   whether the write operation in a synced database is successful. For more 
   information, refer to :ref:`sdks-write-synced-database`.

.. _sdks-write-transactions:

Write Transactions
------------------

The Atlas Device SDK persistence layer handles writes in terms of transactions.
All writes must happen within a transaction. A **transaction** is a list of
read and write operations that the database treats as a single indivisible
operation: either *all* of the operations succeed or *none* of the operations
in the transaction take effect.

The SDK represents each transaction as a callback function
that contains zero or more read and write operations. To run
a transaction, you define a transaction callback and pass it to
one of the database's write methods. Within this callback, you can access a 
database instance and then create, read, update, and delete objects within the
database.

A database file allows only one open write transaction at a time. The SDK
blocks other writes on other threads until the open transaction on the database
file is complete. This means there is never a race condition when reading
values from the database within a transaction.

When you are done with your transaction, the SDK either commits it or cancels
it:

- When the SDK commits a transaction, it writes all changes to disk. For
  synced databases, the SDK then queues the change for synchronization with the
  backend.
- When the SDK cancels a write transaction or an operation in
  the transaction causes an error, all changes are discarded.

.. _sdks-managed-vs-unmanaged-objects:

Managed and Unmanaged Objects
-----------------------------

The SDK's APIs may refer to objects as managed or unmanaged. When you create 
an object with the SDK, it is unmanaged until it is added to the database,
which creates a managed instance.

- **Managed objects** are SDK objects that persist in a database instance. 
  Managed objects can only be accessed from an open database file. They can be
  updated with changes within write transactions as long as that database 
  remains open. Managed objects are tied to the database instance from which
  they originated and cannot be directly written to another database. However,
  some of the SDKs supply a method to copy managed objects from one database
  file to another.

  You can use the SDK's APIs with managed objects. For example, managed
  objects can have relationships with other objects and you can observe them
  for changes. You can also create an unmanaged copy of a managed object. 
  Refer to the :ref:`Create an Unmanaged Copy of an Object or Collection 
  <sdks-create-unmanaged-copy>` section on this page. 

- **Unmanaged objects** are SDK objects that behave like normal objects, 
  but they are not persisted in the database. All SDK objects are unmanaged
  until you add them to a database within a write transaction.
  You cannot use the SDK's APIs with unmanaged objects or observe them for
  changes.

.. _sdks-create-object-methods:

Create Object Methods
---------------------

The SDK provides a variety of methods to create objects and perform write
operations.

.. _sdks-create-one-object:

Create One Object
~~~~~~~~~~~~~~~~~

To create a new object and persist it to the database:

.. tabs-drivers::

   .. tab::
      :tabid: cpp-sdk

      .. include:: /includes/api-details/cpp/crud/create-procedure.rst

   .. tab::
      :tabid: csharp

      .. include:: /includes/api-details/csharp/crud/create-procedure.rst
      
   .. tab::
      :tabid: dart

      .. include:: /includes/api-details/dart/crud/create-procedure.rst

   .. tab::
      :tabid: java

      .. include:: /includes/api-details/java/crud/create-procedure.rst

   .. tab::
      :tabid: java-kotlin

      .. include:: /includes/api-details/java/crud/create-procedure.rst

   .. tab::
      :tabid: javascript

      .. include:: /includes/api-details/javascript/crud/create-procedure.rst

   .. tab::
      :tabid: kotlin

      .. include:: /includes/api-details/kotlin/crud/create-procedure.rst

   .. tab::
      :tabid: objectivec

      .. include:: /includes/api-details/objectivec/crud/create-procedure.rst

   .. tab::
      :tabid: swift

      .. include:: /includes/api-details/swift/crud/create-procedure.rst

   .. tab::
      :tabid: typescript

      .. include:: /includes/api-details/typescript/crud/create-procedure.rst

.. include:: /includes/sdk-examples/crud/create-realm-object.rst

You can also upsert into a database using specific criteria. For more 
information, refer to :ref:`sdks-upsert-an-object`.

.. _sdks-create-multiple-objects:

Create Multiple Objects
~~~~~~~~~~~~~~~~~~~~~~~

Some of the SDKs provide a dedicated API to create multiple objects from
a sequence or collection.

.. tabs-drivers::

   .. tab::
      :tabid: cpp-sdk

      .. include:: /includes/api-details/generic/crud/create-multiple-objects-no-dedicated-api.rst

   .. tab::
      :tabid: csharp

      .. include:: /includes/api-details/csharp/crud/create-multiple-objects-description.rst
      
   .. tab::
      :tabid: dart

      .. include:: /includes/api-details/dart/crud/create-multiple-objects-description.rst

   .. tab::
      :tabid: java

      .. include:: /includes/api-details/generic/crud/create-multiple-objects-no-dedicated-api.rst

   .. tab::
      :tabid: java-kotlin

      .. include:: /includes/api-details/generic/crud/create-multiple-objects-no-dedicated-api.rst

   .. tab::
      :tabid: javascript

      .. include:: /includes/api-details/generic/crud/create-multiple-objects-no-dedicated-api.rst

   .. tab::
      :tabid: kotlin

      .. include:: /includes/api-details/generic/crud/create-multiple-objects-no-dedicated-api.rst

   .. tab::
      :tabid: objectivec

      .. include:: /includes/api-details/objectivec/crud/create-multiple-objects-description.rst

   .. tab::
      :tabid: swift

      .. include:: /includes/api-details/swift/crud/create-multiple-objects-description.rst

   .. tab::
      :tabid: typescript

      .. include:: /includes/api-details/generic/crud/create-multiple-objects-no-dedicated-api.rst

.. include:: /includes/sdk-examples/crud/create-multiple-objects.rst

.. _sdks-upsert-an-object:

Create or Update an Object (Upsert)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An **upsert** is a write operation that either inserts a new object
with a given primary key or updates an existing object that already has
that primary key. We call this an upsert because it is an "**update** or
**insert**" operation. This is useful when an object may or may not
already exist, such as when bulk importing a dataset into an existing
realm. Upserting lets you update existing entries while adding any new entries.

.. tabs-drivers::

   .. tab::
      :tabid: cpp-sdk

      .. include:: /includes/api-details/cpp/api-not-supported-description.rst

   .. tab::
      :tabid: csharp

      .. include:: /includes/api-details/csharp/crud/create-or-update-object-description.rst
      
   .. tab::
      :tabid: dart

      .. include:: /includes/api-details/dart/crud/create-or-update-object-description.rst

   .. tab::
      :tabid: java

      .. include:: /includes/api-details/java/crud/create-or-update-object-java-description.rst

   .. tab::
      :tabid: java-kotlin

      .. include:: /includes/api-details/java/crud/create-or-update-object-kotlin-description.rst

   .. tab::
      :tabid: javascript

      .. include:: /includes/api-details/javascript/crud/create-or-update-object-description.rst

   .. tab::
      :tabid: kotlin

      .. include:: /includes/api-details/kotlin/crud/create-or-update-object-description.rst

   .. tab::
      :tabid: objectivec

      .. include:: /includes/api-details/objectivec/crud/create-or-update-object-description.rst

   .. tab::
      :tabid: swift

      .. include:: /includes/api-details/swift/crud/create-or-update-object-description.rst

   .. tab::
      :tabid: typescript

      .. include:: /includes/api-details/typescript/crud/create-or-update-object-description.rst

.. include:: /includes/sdk-examples/crud/create-or-update-object.rst

.. _sdks-create-objects-with-value:

Initialize Objects with a Value
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Some of the SDKs provide specific methods to initialize objects with a value.
Others use language-idiomatic methods to set the values of objects during
initialization.

Some Property Types are Only Mutable in a Write Transaction
```````````````````````````````````````````````````````````

Some property types are only mutable in a write transaction. For example, 
you can instantiate an object with a :ref:`Set <sdks-create-set-properties>` 
property, but you can only set that property's value in a write transaction. 
You cannot initialize the object with a value for that property unless 
you do so inside a write transaction.

.. tabs-drivers::

   .. tab::
      :tabid: cpp-sdk

      .. include:: /includes/api-details/generic/crud/create-initialize-objects-with-value-no-dedicated-api.rst

   .. tab::
      :tabid: csharp

      .. include:: /includes/api-details/generic/crud/create-initialize-objects-with-value-no-dedicated-api.rst
      
   .. tab::
      :tabid: dart

      .. include:: /includes/api-details/generic/crud/create-initialize-objects-with-value-no-dedicated-api.rst

   .. tab::
      :tabid: java

      .. include:: /includes/api-details/generic/crud/create-initialize-objects-with-value-no-dedicated-api.rst

   .. tab::
      :tabid: java-kotlin

      .. include:: /includes/api-details/generic/crud/create-initialize-objects-with-value-no-dedicated-api.rst

   .. tab::
      :tabid: javascript

      .. include:: /includes/api-details/generic/crud/create-initialize-objects-with-value-no-dedicated-api.rst

   .. tab::
      :tabid: kotlin

      .. include:: /includes/api-details/generic/crud/create-initialize-objects-with-value-no-dedicated-api.rst

   .. tab::
      :tabid: objectivec

      .. include:: /includes/api-details/objectivec/crud/create-initialize-objects-with-value-description.rst

   .. tab::
      :tabid: swift

      .. include:: /includes/api-details/swift/crud/create-initialize-objects-with-value-description.rst

   .. tab::
      :tabid: typescript

      .. include:: /includes/api-details/generic/crud/create-initialize-objects-with-value-no-dedicated-api.rst

.. include:: /includes/sdk-examples/crud/create-initialize-objects-with-value.rst

.. _sdks-create-objects-from-json:

Create Objects from JSON
~~~~~~~~~~~~~~~~~~~~~~~~

.. tabs-drivers::

   .. tab::
      :tabid: cpp-sdk

      .. include:: /includes/api-details/generic/crud/create-objects-from-json-missing-example.rst

   .. tab::
      :tabid: csharp

      .. include:: /includes/api-details/generic/crud/create-objects-from-json-missing-example.rst
      
   .. tab::
      :tabid: dart

      .. include:: /includes/api-details/generic/crud/create-objects-from-json-missing-example.rst

   .. tab::
      :tabid: java

      .. include:: /includes/api-details/java/crud/create-objects-from-json-description.rst

   .. tab::
      :tabid: java-kotlin

      .. include:: /includes/api-details/java/crud/create-objects-from-json-description.rst

   .. tab::
      :tabid: javascript

      .. include:: /includes/api-details/generic/crud/create-objects-from-json-missing-example.rst

   .. tab::
      :tabid: kotlin

      .. include:: /includes/api-details/generic/crud/create-objects-from-json-missing-example.rst

   .. tab::
      :tabid: objectivec

      .. include:: /includes/api-details/objectivec/crud/create-objects-from-json-description.rst

   .. tab::
      :tabid: swift

      .. include:: /includes/api-details/swift/crud/create-objects-from-json-description.rst

   .. tab::
      :tabid: typescript

      .. include:: /includes/api-details/generic/crud/create-objects-from-json-missing-example.rst

.. include:: /includes/sdk-examples/crud/create-objects-from-json.rst

.. _sdks-create-unmanaged-copy:

Create an Unmanaged Copy of an Object
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Some of the SDKs provide APIs to create an unmanaged, in-memory copy of a
managed object or collection. In other SDKs, this API is not needed or not
currently implemented.

.. tabs-drivers::

   .. tab::
      :tabid: cpp-sdk

      .. include:: /includes/api-details/cpp/crud/create-unmanaged-copy-description.rst

   .. tab::
      :tabid: csharp

      .. include:: /includes/api-details/generic/crud/create-unmanaged-copy-not-supported.rst
      
   .. tab::
      :tabid: dart

      .. include:: /includes/api-details/generic/crud/create-unmanaged-copy-not-supported.rst

   .. tab::
      :tabid: java

      .. include:: /includes/api-details/java/crud/create-unmanaged-copy-description.rst

   .. tab::
      :tabid: java-kotlin

      .. include:: /includes/api-details/java/crud/create-unmanaged-copy-description.rst

   .. tab::
      :tabid: javascript

      .. include:: /includes/api-details/generic/crud/create-unmanaged-copy-not-supported.rst

   .. tab::
      :tabid: kotlin

      .. include:: /includes/api-details/kotlin/crud/create-unmanaged-copy-description.rst

   .. tab::
      :tabid: objectivec

      .. include:: /includes/api-details/generic/crud/create-unmanaged-copy-not-supported.rst

   .. tab::
      :tabid: swift

      .. include:: /includes/api-details/generic/crud/create-unmanaged-copy-not-supported.rst

   .. tab::
      :tabid: typescript

      .. include:: /includes/api-details/generic/crud/create-unmanaged-copy-not-supported.rst

.. include:: /includes/sdk-examples/crud/create-unmanaged-object.rst

.. _sdks-create-copy-object-to-another-database:

Copy an Object to Another Database
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can copy objects that are managed by one database instance to another
database instance.

.. tabs-drivers::

   .. tab::
      :tabid: cpp-sdk

      .. include:: /includes/api-details/generic/crud/create-copy-object-to-another-database-no-example.rst

   .. tab::
      :tabid: csharp

      .. include:: /includes/api-details/generic/crud/create-copy-object-to-another-database-no-example.rst
      
   .. tab::
      :tabid: dart

      .. include:: /includes/api-details/generic/crud/create-copy-object-to-another-database-no-example.rst

   .. tab::
      :tabid: java

      .. include:: /includes/api-details/java/crud/create-copy-object-to-another-database-description.rst

   .. tab::
      :tabid: java-kotlin

      .. include:: /includes/api-details/java/crud/create-copy-object-to-another-database-description.rst

   .. tab::
      :tabid: javascript

      .. include:: /includes/api-details/generic/crud/create-copy-object-to-another-database-js-ts-description.rst

   .. tab::
      :tabid: kotlin

      .. include:: /includes/api-details/kotlin/crud/create-copy-object-to-another-database-description.rst

   .. tab::
      :tabid: objectivec

      .. include:: /includes/api-details/objectivec/crud/create-copy-object-to-another-database-description.rst

   .. tab::
      :tabid: swift

      .. include:: /includes/api-details/swift/crud/create-copy-object-to-another-database-description.rst

   .. tab::
      :tabid: typescript

      .. include:: /includes/api-details/generic/crud/create-copy-object-to-another-database-js-ts-description.rst

.. include:: /includes/sdk-examples/crud/create-copy-object-to-another-database.rst

.. _sdks-create-objects-in-background:

Create Objects in the Background
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When performing large write operations, you may want to create objects in the
background. This avoids blocking the UI thread while performing large write
operations. This is particularly useful when using Device Sync, where you don't
know when and for how long the Sync client will be writing.

.. tabs-drivers::

   .. tab::
      :tabid: cpp-sdk

   .. tab::
      :tabid: csharp

      .. include:: /includes/api-details/csharp/crud/create-objects-in-background-description.rst
      
   .. tab::
      :tabid: dart

      .. include:: /includes/api-details/dart/crud/create-objects-in-background-description.rst

   .. tab::
      :tabid: java

   .. tab::
      :tabid: java-kotlin

   .. tab::
      :tabid: javascript

   .. tab::
      :tabid: kotlin

   .. tab::
      :tabid: objectivec

   .. tab::
      :tabid: swift

      .. include:: /includes/api-details/swift/crud/create-objects-in-background-description.rst

   .. tab::
      :tabid: typescript

.. include:: /includes/sdk-examples/crud/create-objects-in-background.rst
