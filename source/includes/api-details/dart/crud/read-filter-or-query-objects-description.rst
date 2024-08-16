Filter a collection to retrieve a specific segment of objects with the
:flutter-sdk:`Realm.query() <realm/Realm/query.html>` method. In the
``query()`` method's argument, use RQL to perform filtering.

.. literalinclude:: /examples/generated/flutter/read_write_data_test.snippet.filter.dart
   :language: dart

You can use iterable arguments in your filter.
