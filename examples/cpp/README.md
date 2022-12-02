# Realm CPP Examples

This project contains the C++ code examples for the Realm C++ SDK and 
their unit and UI tests.

The first time you set up the project, run through **First-time Setup**. 

When you're already set up but you have edited source code, start with 
**Build the Project**.

If you just want to run the tests, go to **Run the Tests**.

## First-time Setup

The project uses [CMake](https://cmake.org/) to create build files (Makefile, .xcodeproj...) for the 
project. To check if you have CMake installed:

```shell
cmake
```

If you do have CMake installed, you should see the help documentation. If 
you don't, you can install it with brew or by downloading it directly from CMake.

```shell
brew install cmake
```

Run CMake in a gitignored directory, such as build, to generate the build 
configurations that you can then use to compile your app. If this is the
first time you're setting up the project, you'll need to make the `build` 
directory.

```shell
# build/ is in .gitignore
mkdir build
cd build
```

## Build the Project

From `/examples/cpp/build`, run `cmake` to create a Makefile by reading the 
`CMakeLists.txt` in the parent directory.

```shell
cmake ../
```

You can `ls` to see that a Makefile has been generated. Then, build the app:

```shell
make
```

The first time you run `make`, the process will take some time because it's
doing a full build. On subsequent runs, `make` does incremental builds, so
rebuilding will be faster.

When the build is complete, `ls` should reveal an `examples` executable
at the root of the build directory.

## Run the Tests

To run the tests, from the `build` directory:

```shell
./examples
```

## Update the Realm SDK Version

CMakeLists.txt has a FetchContent block that pulls in the realm-cpp repository
code as a dependency, and compiles it:

```shell
FetchContent_Declare(
  cpprealm
  GIT_REPOSITORY https://github.com/realm/realm-cpp.git
  GIT_TAG        f4f89d1c75d4c762a679f57d2e9f26e87ec1215b
)
```

To change the version of the SDK we use in the build, change the value
of the `GIT_TAG`. While in early Alpha, this is a commit hash, but it could 
be a version tag once the SDK starts doing tagged releases. For more 
information, refer to the 
[FetchContent Module docs](https://cmake.org/cmake/help/latest/module/FetchContent.html).

For best results, delete everything in the `build` folder. Then create
a new Makefile and build the project again before running the tests.

From `/examples/cpp/build`, run `cmake` to create a Makefile by reading the 
`CMakeLists.txt` in the parent directory.

```shell
cmake ../
```

You can `ls` to see that a Makefile has been generated. Then, build the app:

```shell
make
```

## Add a New Test File

To add a new test file, create a file with a `.cpp` extension in `examples/cpp/`.

Include the relevant headers. They probably look something like:

```cpp
#include <catch2/catch_test_macros.hpp>
#include <chrono>
#include <string>
#include <thread>
#include <cpprealm/sdk.hpp>
```

Write the test code.

Open `CMakeLists.txt` and add the new file name to the `add_executable` at ln 20:

```txt
add_executable(examples examples.cpp my_new_test_file.cpp)
```

Run `cmake` and `make` to build the project again, and then run the tests.

## Add a New Example

Find the relevant test case file for the section or category you wish to write
an example for.

Define a new `TEST_CASE`. This should have a unique string name - as in the 
example below `"add a dog object to a realm"`, and a `"[test]"` tag.

```cpp
TEST_CASE("add a dog object to a realm", "[test]") {
    auto dog = Dog { .name = "Rex", .age = 1 };
    
    std::cout << "dog: " << dog << "\n";

    auto realm = realm::open<Person, Dog>();

    realm.write([&realm, &dog] {
        realm.add(dog);
    });
}
```

Run `cmake` and `make` to build the project again, and then run the tests.

## Build and Run for Xcode

If you want to use Xcode for breakpoints and debugging, you can build 
the project to run it in Xcode. 

From the `/build` directory, run CMake with a `-G Xcode` flag:

```shell
cmake ../ -G Xcode
```

Note: If you have previously run `CMake` for this project, you may see an
error:

```shell
CMake Error: Error: generator : Xcode
Does not match the generator used previously: Unix Makefiles
Either remove the CMakeCache.txt file and CMakeFiles directory or choose a different binary directory.
```

Run this from a clean build directory, or remove the specified files. On a 
successful build, you should see `examples.xcodeproj` in the `/build` directory.

Open the project in Xcode.

Inside the project, you'll see all the linked files, but the source files 
for the examples are located in:

`examples/Source Files`

To build and run these source files in Xcode, select the `examples` executable
target and press the `Start` (▶) button. You should see the results and any
print output in the console.
