# Realm CPP Examples

This project contains code examples for the Realm C++ SDK and their unit and UI tests.

The first time you set up the project, run through **First-time Setup**.

When you're already set up but you have edited source code, start with
**Build the Project**.

If you just want to run the tests, go to **Run the Tests**.

The Flexible Sync backend that this app hits is the [cpp-tester App Services app in the Realm Example Testers Atlas project of the Bushicorp Atlas Organization](https://realm.mongodb.com/groups/5f60207f14dfb25d23101102/apps/6388f860cb722c5a5e002425/dashboard)

## First-time Setup

The project uses [CMake](https://cmake.org/) to create build files (Makefile, .xcodeproj...) for the
project. To check if you have CMake installed run:

```shell
cmake
```

If you do have CMake installed, you should see the help documentation in your terminal. If
you don't, you can install CMake with brew or by downloading it directly from CMake.

```shell
brew install cmake
```

Run CMake in a gitignored directory, such as `build`, to generate build
configurations that you can then use to compile your app. If this is the
first time you're setting up the project, you'll need to make a `build`
directory.

```shell
# build/ is in .gitignore
mkdir build
cd build
```

## Build the Project

From `/examples/cpp/build`, run `cmake` to create a Makefile by reading
`CMakeLists.txt` in the parent directory.

```shell
cmake ../
```

Use `ls` to see that a Makefile has been generated. Then, build the app:

```shell
make
```

The first time you run `make`, the process will take some time because it's
doing a full build. On subsequent runs, `make` does incremental builds, so
rebuilding will be faster.

When the build is complete, `ls` should reveal an `examples` executable
at the root of the `build` directory.

## Run the Tests

To run the tests, execute the `examples` file from the `build` directory:

```shell
./examples
```

### How to Skip Tests Using Device Sync

Tests that use Device Sync require the example app to make network calls.
When you run tests involving Device Sync, you'll see a modal requesting
you to enter your laptop password. Even when you select _Always Allow_,
you'll be prompted to re-enter this password whenever you build a new
version of the executable.

This is because macOS enforces access control technology at the kernel
level. It does this using App Sandbox. When developing in Xcode, you can
[enable access to restricted
resources](https://developer.apple.com/documentation/xcode/configuring-the-macos-app-sandbox/).
Because this example project does not necessarily use Xcode, I'm not aware of a way
to set the required entitlements for this project. This is probably
something that would be useful to research when someone gets some downtime.

Meanwhile, if you're doing a lot of building and running, and you don't
want to enter your password every time you rebuild the executable, you
can exclude sync tests from your test run. To exclude the sync tests,
pass a flag that contains the tag or tags you want to exclude when you
run the tests:

```shell
./examples ~[sync]
```

This requires us to tag every example using sync with the `sync` tag. For
an example, see the "open a synced realm" test case in `examples.cpp`.

## Update the Realm SDK Version

CMakeLists.txt has a FetchContent block that pulls in the `realm-cpp` repository
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

For best results, delete everything in the `build` directory. Then create
a new Makefile and build the project again before running the tests.

From `/examples/cpp/build`, run `cmake` to create a Makefile by reading
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
For example, `my_new_test_file.cpp`.

Include the relevant headers. They probably look something like:

```cpp
#include <catch2/catch_test_macros.hpp>
#include <chrono>
#include <string>
#include <thread>
#include <cpprealm/sdk.hpp>
```

Write the test code.

Open `CMakeLists.txt` and add the new file name to the `add_executable` function:

```txt
add_executable(examples examples.cpp my_new_test_file.cpp)
```

To verify your new test file works, [build the project](https://github.com/mongodb/docs-realm/tree/master/examples/cpp#build-the-project)
again and then [run the tests](https://github.com/mongodb/docs-realm/tree/master/examples/cpp#run-the-tests) again.

## Add a New Example

Find the relevant test case file for the section or category you wish to write
an example for.

Define a new `TEST_CASE`. This should have a unique string name - as in the
example below `"add a dog object to a realm"`, and a tag that designates it
as part of a relevant group of tests. In the example below, the test is tagged
with `"[write]"`.

To enable us to run a group of tests, or exclude a group of tests, use
relevant tags when creating new test cases. For example, tests that use
Device Sync could be tagged with `"[sync]"` so we can easily skip them or
run them specifically, depending on what we're testing.

```cpp
TEST_CASE("add a dog object to a realm", "[write]") {
    auto dog = Dog { .name = "Floof", .age = 3 };

    std::cout << "dog: " << dog << "\n";

    auto realm = realm::open<Person, Dog>();

    realm.write([&realm, &dog] {
        realm.add(dog);
    });
}
```

To verify your new example works, from the `/build` directory, run `make`and then
[run the tests](https://github.com/mongodb/docs-realm/tree/master/examples/cpp#run-the-tests)
again.

## Build and Run for Xcode

If you want to use Xcode for breakpoints and debugging, you can build
the project to run in Xcode.

From the `/build` directory, run CMake with a `-G Xcode` flag:

```shell
cmake ../ -G Xcode
```

If you have previously run `CMake` for this project, you may see this error:

```shell
CMake Error: Error: generator : Xcode
Does not match the generator used previously: Unix Makefiles
Either remove the CMakeCache.txt file and CMakeFiles directory or choose a different binary directory.
```

To address this error, you can run `cmake ../ -G Xcode` from a clean build directory,
create a new subdirectory for xcode (`/build/xcode`), or remove the files specified
in the error.

On a successful build, you should see `examples.xcodeproj` in the directory
Xcode builds to.

Open the project in Xcode.

Inside the project, you'll see all the linked files, but the source files
for the examples are located in:

`examples/Source Files`

To build and run these source files in Xcode, select the `examples` executable
target and press the `Start` (▶) button. You should see the results and any
print output in the console.
