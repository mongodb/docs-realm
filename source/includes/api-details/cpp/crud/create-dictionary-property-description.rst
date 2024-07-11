When you create an object that has a 
:cpp-sdk:`map property <structrealm_1_1managed_3_01std_1_1map_3_01std_1_1string_00_01T_01_4_00_01void_01_4.html>`, 
you can set the values for keys in a few ways: 

- Set keys and values on the object and then add the object to the database
- Set the object's keys and values directly inside a write transaction

.. include:: /includes/map-key-string-limitations.rst

.. literalinclude:: /examples/generated/cpp/crud.snippet.percent-encode-disallowed-characters.cpp
   :language: cpp
