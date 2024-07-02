#. Open a write transaction with the
   :objc-sdk:`-[RLMRealm transactionWith:block]
   <Classes/RLMRealm.html#/c:objc(cs)RLMRealm(im)transactionWithBlock:>`
   or the :objc-sdk:`-[RLMRealm transactionWithoutNotifying:block:]
   <Classes/RLMRealm.html#/c:objc(cs)RLMRealm(im)transactionWithoutNotifying:block:>`
   methods.

#. Instantiate an unmanaged object instance of a class that subclasses one
   of:

   - :objc-sdk:`RLMObject <Classes/RLMObject.html>`
   - :objc-sdk:`RLMEmbeddedObject <Classes/RLMEmbeddedObject.html>`
   - :objc-sdk:`RLMAsymmetricObject <Classes/RLMAsymmetricObject.html>`
   
   For more information, refer to :ref:`sdks-object-models`.

#. Pass the unmanaged object instance to the 
   :objc-sdk:`-[RLMRealm addObject:]
   <Classes/RLMRealm.html#/c:objc(cs)RLMRealm(im)addObject:>` method
   to persist the object data to the database.
