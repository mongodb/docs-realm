Use :java-sdk:`realm.copyToRealm() <io/realm/Realm.html#copyToRealm(E,io.realm.ImportFlag...)>`
in a write transaction to copy a managed object to another database instance.

Alternately, to copy an object that does not exist, or update an object that
does exist, use :java-sdk:`realm.copyToRealmOrUpdate()
<io/realm/Realm.html#copyToRealmOrUpdate(E,io.realm.ImportFlag...)>`. This
copies an object where the target database instance does not contain an
object with the same primary key. If the target database instance already
contains an object with a matching primary key, it updates the object.
