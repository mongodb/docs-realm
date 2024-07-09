Create an unmanaged copy of a managed object by passing it to 
:kotlin-sdk:`copyFromRealm() <io.realm.kotlin.ext/copy-from-realm.html>`.
For collections, this is a deep copy that includes all referenced objects up
to the specified ``depth``.

In the following example, we create an unmanaged copy of an existing 
managed ``Pond`` object that contains a list of two ``Frog`` objects. 
After copying the object from the database, we confirm that the copy is
unmanaged and contains both referenced ``Frog`` objects:
