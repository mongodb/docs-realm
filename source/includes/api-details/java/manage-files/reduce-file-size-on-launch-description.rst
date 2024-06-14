.. important:: Compact All Production Applications

    Every production application should implement compacting to 
    periodically reduce database file size.

Specify the :java-sdk:`compactOnLaunch()
<io/realm/RealmConfiguration.Builder.html#compactOnLaunch-io.realm.CompactOnLaunchCallback->`
builder option when opening the first connection to a database in your
Android application.
