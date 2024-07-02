To copy a managed object to another database instance, call the
:objc-sdk:`RLMObject createOrUpdateInRealm:withValue 
<Classes/RLMObject.html#/c:objc(cs)RLMObject(cm)createOrUpdateInRealm:withValue:>`
or :objc-sdk:`RLMObject createOrUpdateModifiedInRealm:withValue 
<Classes/RLMObject.html#/c:objc(cs)RLMObject(cm)createOrUpdateModifiedInRealm:withValue:>`
method in a write transaction.

If the object type does not have a primary key, or no object with a matching
primary key exists, this method creates a new object in the target database
instance.

If an object with a matching primary key already exists in the target
database instance, ``createOrUpdateInRealm`` sets each property defined in its
schema by copying from value using key-value coding.

Alternately, ``createOrUpdateModifiedInRealm`` only sets values which have
changed. Checking which properties have changed imposes a small amount of
overhead, and so this method may be slower when all or nearly all of the
properties being set have changed. If most or all of the properties being set
have *not* changed, this method is much faster than unconditionally setting
all of them. It also reduces how much data has to be written to the database,
saving both i/o time and disk space.
