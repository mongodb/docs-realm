For the Swift SDK, set the log level for the default logger with
``Logger.shared.level``. The :objc-sdk:`RLMLogLevel <Enums/RLMLogLevel.html>`
enum represents the different levels of logging you can configure.

.. tip:: Set the Logger Before Initializing an App Client

  When you initialize an :ref:`App client <sdks-connect-to-atlas>`, the Swift SDK
  caches the configuration for the App. Changing to the App configuration
  after initialization does not have any effect. This includes setting a 
  logger. Initializing an App reads the current shared logger and stores that. 

  However, changing the log level for an existing logger does work at any time.
