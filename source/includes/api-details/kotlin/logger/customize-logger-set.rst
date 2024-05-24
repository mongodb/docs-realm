You can create a custom logger that implements the
`RealmLogger <{+kotlin-local-prefix+}io.realm.kotlin.log/-realm-logger/index.html>`__
interface. You might want to customize logging to add specific tags or set
specific log levels during development, testing, or debugging.

Then, you can initialize your custom logger and call the
`RealmLog.add() <{+kotlin-local-prefix+}io.realm.kotlin.log/-realm-log/add.html>`__
function to set it as a logger for your app.

You can also remove a specific logger or remove all loggers, including the system logger.
