The Kotlin SDK uses the global
`RealmLog <{+kotlin-local-prefix+}io.realm.kotlin.log/-realm-log/index.html>`__
singleton. You can set the ``RealmLog.level`` property to an entry in the
`LogLevel <{+kotlin-local-prefix+}io.realm.kotlin.log/-log-level/index.html>`__ 
enum to specify the level of data you want to receive. If the log level 
priority is equal to or higher than the priority defined in ``RealmLog.level``,
the database logs the event. You can change the log level at any point during
the app's lifecycle from this global singleton.

By default, all logs go to a default system logger that varies by system:

- Android logs to Logcat.
- JVM logs to stdout.
- MacOS logs to NSLog.
- iOS logs to NSLog.

.. include:: /includes/tip-sync-log-levels.rst
