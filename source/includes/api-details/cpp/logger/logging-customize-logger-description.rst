To set a custom logger function with the C++ SDK, create a 
:cpp-sdk:`realm::logger <structrealm_1_1logger.html#a1c4a96ab2eb5e6b164f17552c233104a>`
and override the virtual ``do_log()`` member function.

.. literalinclude:: /examples/generated/cpp/logger.snippet.create-custom-logger.cpp
  :language: cpp
