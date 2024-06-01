You can configure Realm to compact the realm file each time it is opened
by setting a callback for the `compactOnLaunch 
<{+kotlin-local-prefix+}io.realm.kotlin/-configuration/-shared-builder/compact-on-launch.html>`__ function
for the configuration. When you call ``compactOnLaunch`` for the 
configuration, the `DEFAULT_COMPACT_ON_LAUNCH_CALLBACK 
<{+kotlin-local-prefix+}io.realm.kotlin/-realm/-companion/
-d-e-f-a-u-l-t_-c-o-m-p-a-c-t_-o-n_-l-a-u-n-c-h_-c-a-l-l-b-a-c-k.html>`__ 
will trigger if the file is above 50 MB and 50% or more of the space in 
the realm file is unused. You can specify custom compaction settings 
when calling ``compactOnLaunch`` depending on your applications needs.
The following code example shows how to do this: