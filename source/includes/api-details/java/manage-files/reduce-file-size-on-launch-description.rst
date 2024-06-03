.. important:: Compact All Production Applications

    Every production application should implement compacting to 
    periodically reduce realm file size.

Specify the :java-sdk:`compactOnLaunch()
<io/realm/RealmConfiguration.Builder.html#compactOnLaunch-io.realm.CompactOnLaunchCallback->`
builder option when opening the first connection to a realm in your
Android application.
