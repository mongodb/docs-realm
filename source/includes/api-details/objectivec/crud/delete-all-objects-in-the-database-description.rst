To delete all objects from the database, call :objc-sdk:`-[RLMRealm
deleteAllObjects]
<Classes/RLMRealm.html#/c:objc(cs)RLMRealm(im)deleteAllObjects>`
inside of a write transaction. This clears the database of all object
instances but does not affect the database's schema.
