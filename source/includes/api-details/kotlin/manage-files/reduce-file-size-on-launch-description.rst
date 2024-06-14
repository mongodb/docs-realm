You can use the Kotlin SDK to compact the database file each time it is opened
by setting a callback for the :kotlin-sdk:`compactOnLaunch 
<io.realm.kotlin/-configuration/-shared-builder/compact-on-launch.html>` function
for the configuration. When you call ``compactOnLaunch`` for the 
configuration, the :kotlin-sdk:`DEFAULT_COMPACT_ON_LAUNCH_CALLBACK 
<io.realm.kotlin/-realm/-companion/-d-e-f-a-u-l-t_-c-o-m-p-a-c-t_-o-n_-l-a-u-n-c-h_-c-a-l-l-b-a-c-k.html>`
will trigger if the file is above 50 MB and 50% or more of the space in 
the database file is unused. You can specify custom compaction settings 
when calling ``compactOnLaunch`` depending on your applications needs.
The following code example shows how to do this:
