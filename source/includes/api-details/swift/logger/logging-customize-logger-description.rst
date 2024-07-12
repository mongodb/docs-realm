In the Swift SDK, initialize an instance of a :swift-sdk:`Logger 
<Typealiases.html#/s:10RealmSwift6Loggera>` and define the function to use
for logging.

.. literalinclude:: /examples/generated/code/start/Logging.snippet.define-custom-logger.swift
  :language: swift

In the Swift SDK, use ``Logger.shared``. After you set the default logger, you
can change the log level during the app lifecycle as needed.
