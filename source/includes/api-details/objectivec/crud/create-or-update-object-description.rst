To upsert an object, call :objc-sdk:`-[RLMRealm
addOrUpdateObject:]
<Classes/RLMRealm.html#/c:objc(cs)RLMRealm(im)addOrUpdateObject:>`.

.. literalinclude:: /examples/generated/code/start/ReadWriteData.snippet.upsert.m
   :language: objectivec

You can also partially update an object by passing the primary key and a
subset of the values to update:
