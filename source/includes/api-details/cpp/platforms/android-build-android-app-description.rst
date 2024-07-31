The SDK supports building Android apps with C++. To build an Android app:

- :ref:`sdks-install`
- Add ``<uses-permission android:name="android.permission.INTERNET" />`` to
  your ``AndroidManifest.xml``
- Add the SDK's subdirectory to your native library's ``CMakeLists.txt``
  and link it as a target library:

  .. code-block:: text

     set(CMAKE_CXX_STANDARD 17) 
     add_subdirectory("realm-cpp")
     ...
     target_link_libraries( 
        # Specifies the target library.
        myapplication
        # make sure to link the C++ SDK.
        cpprealm
     )

- Ensure that the git submodules are initialized inside of the ``realm-cpp``
  folder before building. 
- When instantiating the database or the SDK App, you must pass the
  ``filesDir.path`` as the ``path`` parameter in the respective constructor or
  database open template. 

For an example of how to use the SDK in an Android app, refer to
the :github:`Android RealmExample App <realm/realm-cpp/tree/main/examples/Android>`
in the ``realm-cpp`` GitHub repository.

Specifically, refer to the ``MainActivity.kt`` & ``native-lib.cpp`` files 
in the Android example app for code examples.
