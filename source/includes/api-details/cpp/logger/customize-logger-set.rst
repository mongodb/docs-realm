To set a custom logger function, create a 
:cpp-sdk:`realm::logger <structrealm_1_1logger.html#a1c4a96ab2eb5e6b164f17552c233104a>`
and override the virtual ``do_log()`` member function.

.. literalinclude:: /examples/generated/cpp/logger.snippet.create-custom-logger.cpp
   :language: cpp

Then, initialize an instance of the logger and set it as the default logger
for your realm:

.. literalinclude:: /examples/generated/cpp/logger.snippet.initialize-logger.cpp
   :language: cpp
