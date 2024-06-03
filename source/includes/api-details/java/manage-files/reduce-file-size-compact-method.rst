You can remove unused space by **compacting** the realm file by manually 
calling :java-sdk:`compactRealm()
<io/realm/Realm.html#compactRealm-io.realm.RealmConfiguration->`

.. important:: Compact All Production Applications

    Every production application should implement compacting to 
    periodically reduce realm file size.