To set a custom logger, call :js-sdk:`setLogger() <classes/Realm-1.html#setLogger>`.
This method recieves ``level`` and ``message`` arguments from the Realm logger.
You can use these arguments to define your own logging behavior.

.. literalinclude:: /examples/generated/node/v12/logger.test.snippet.set-custom-logger.ts
  :language: javascript

This sets the logging behavior for all Realm logging in your application. If you
do not provide a log level, the default value is "info".
