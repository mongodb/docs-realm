In Dart, there are two ways to query inverse relationships.

You can use the :flutter-sdk:`getBacklinks()
<realm/RealmObjectBase/getBacklinks.html>` method to retrieve an object at
the origin of the relationship from the related object.

Here, we use the ``getBacklinks()`` method to find any ``User`` objects that
link to the specified tasks through the ``tasks`` backlinks property:

.. literalinclude:: /examples/generated/flutter/backlinks_test.snippet.query-backlink-inverse-relationship.dart
   :language: dart

You can also filter by inverse relationships using the
``@links.<Type>.<Property>`` syntax. For example, a filter can match 
a ``Task`` object based on properties of the ``User``
object that references it.
