In Java, to define an SDK object in your application,
create a subclass of :java-sdk:`RealmObject <io/realm/RealmObject.html>`
or implement :java-sdk:`RealmModel <io/realm/RealmModel.html>`.

.. important::

   - All SDK objects must provide an empty constructor.
   - All SDK objects must use the ``public`` visibility modifier

**Extend RealmObject**

The following code block shows a Realm object that
describes a Frog. This Frog class can be stored in
Realm because it ``extends`` the ``RealmObject`` class.

.. include:: /examples/generated/java/local/FrogObjectExample.snippet.complete.java.rst

**Implement RealmModel**

The following code block shows a Realm object that
describes a Frog. This Frog class can
be stored in Realm because it ``implements`` the
``RealmModel`` class and uses the ``@RealmClass`` annotation:

.. include:: /examples/generated/java/local/FrogRealmModelExample.snippet.complete.java.rst

.. important::

   All Realm objects must use the ``public``
   visibility modifier.

.. tip:: Using ``RealmObject`` Methods

   When you create a Realm object by extending the ``RealmObject``
   class, you can access ``RealmObject`` class methods dynamically on
   instances of your Realm object. Realm objects
   created by implementing ``RealmModel`` can access those same methods
   statically through the ``RealmObject`` class.
