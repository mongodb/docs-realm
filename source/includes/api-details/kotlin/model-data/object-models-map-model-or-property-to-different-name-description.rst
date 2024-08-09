To map a Kotlin class or property name in your code to a different in the
database: 

#. Use the 
   :kotlin-sdk:`@PersistedName <io.realm.kotlin.types.annotations/-persisted-name/index.html>`
   annotation on the Kotlin class or property. 
#. Specify a class or property ``name`` that you want persisted to 
   the database. 

**Map a Model Name**

In this example, ``Frog`` is the Kotlin class name used in the code 
throughout the project to perform CRUD operations, and ``Frog_Entity`` is the
persisted name to used to store objects in the database:

.. literalinclude:: /examples/generated/kotlin/Schema.snippet.define-persisted-class.kt
   :language: kotlin

.. important:: Querying by Remapped Class Names

    When querying an inverse relationship on an object with a 
    remapped class name, you must use the persisted class name.
    In the example above, you must query ``Frog_Entity`` instead of 
    ``Frog``. 
    For more information, refer to :ref:`Query Inverse Relationships 
    <sdks-read-query-inverse-relationships>`.

**Map a Property Name**

In this example, ``species`` is the Kotlin property name used in the code 
throughout the project to perform CRUD operations and ``latin_name`` is the 
persisted name used to store values in the database:

.. tip:: Querying by Remapped Property Names

   You can query by either the Kotlin name used in the code *or* by the
   persisted name stored in the database.
