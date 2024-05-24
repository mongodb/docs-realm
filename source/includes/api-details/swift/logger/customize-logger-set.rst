Initialize an instance of a :swift-sdk:`Logger <Typealiases.html#/s:10RealmSwift6Loggera>` 
and define the function to use for logging.

.. literalinclude:: /examples/generated/code/start/Logging.snippet.define-custom-logger.swift
   :language: swift

.. include:: /includes/tip-sync-log-levels.rst

You can set a logger as the default logger for your app with ``Logger.shared``. 
After you set the default logger, you can change the log level during the app 
lifecycle as needed.
