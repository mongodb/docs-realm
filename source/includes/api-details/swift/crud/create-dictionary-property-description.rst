When you create an object that has a :swift-sdk:`map property 
<Classes/Map.html>`, you can set the values for keys in a few ways: 

- Set keys and values on the object and then add the object to the realm
- Set the object's keys and values directly inside a write transaction
- Use key-value coding to set or update keys and values inside a write transaction

.. include:: /includes/map-key-string-limitations.rst

.. literalinclude:: /examples/generated/code/start/CreateRealmObjects.snippet.percent-encode-disallowed-map-keys.swift
