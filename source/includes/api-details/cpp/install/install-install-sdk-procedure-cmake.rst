You can use CMake with the FetchContent module to manage the SDK and its
dependencies in your C++ project.

.. procedure::

   .. step:: Create or Modify CMakeLists.txt

      Create or modify your ``CMakeLists.txt`` in the root directory of your 
      project:

      1. Add ``Include(FetchContent)`` to include the FetchContent module 
         in your project build.
      #. Use ``FetchContent_Declare`` to locate the SDK dependency 
         and specify the version tag you want to use. 
      #. Use the ``FetchContent_MakeAvailable()`` command to check whether 
         the named dependencies have been populated, and if not, populate them. 
      #. Finally, ``target_link_libraries()`` links the SDK dependency to 
         your target executable. 

      To get the most recent version tag, refer to the releases on GitHub: 
      `realm/realm-cpp <https://github.com/realm/realm-cpp/releases>`__.

      Set the minimum C++ standard to 17 with ``set(CMAKE_CXX_STANDARD 17)``.

      In a Windows install, add the required compiler flag:

      .. code-block::

         if(MSVC)
            set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} /Zc:preprocessor /bigobj")
         endif()

      .. example::

         .. code-block:: cmake
            :emphasize-lines: 14, 17-21, 24, 29

            cmake_minimum_required(VERSION 3.15)

            project(MyDeviceSDKCppProject)

            # Minimum C++ standard
            set(CMAKE_CXX_STANDARD 17)

            # In a Windows install, set these compiler flags:
            if(MSVC)
               set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} /Zc:preprocessor /bigobj")
            endif()

            # Include the FetchContent module so you can download the C++ SDK
            Include(FetchContent)

            # Declare the version of the C++ SDK you want to download
            FetchContent_Declare(
               cpprealm
               GIT_REPOSITORY https://github.com/realm/realm-cpp.git
               GIT_TAG        v1.0.0
            )

            # The MakeAvailable command ensures the named dependencies have been populated
            FetchContent_MakeAvailable(cpprealm)

            # Create an executable target called myApp with the source file main.cpp
            add_executable(myApp main.cpp)

            target_link_libraries(myApp PRIVATE cpprealm)

   .. step:: Run CMake

      Run CMake in a gitignored directory, such as ``build``, to generate the build
      configurations that you can then use to compile your app:

      .. code-block::

         # build/ is in .gitignore
         mkdir build
         cd build
         cmake .. # Create Makefile by reading the CMakeLists.txt in the parent directory (../)
         make # Actually build the app

      You can use CMake to generate more than simple Makefiles by using the ``-G``
      flag. See the `CMake documentation <https://cmake.org/documentation/>`_ for more
      information.
