To set a custom logger with the Node.js SDK, call :js-sdk:`setLogger() 
<classes/Realm-1.html#setLogger>`. This method recieves ``level`` and
``message`` arguments from the database logger. You can use these arguments to
define your own logging behavior.

This sets the logging behavior for all database logging in your application. If
you do not provide a log level, the default value is "info".
