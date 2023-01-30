cmake_minimum_required(VERSION 3.15)

project(examples)

set(CMAKE_CXX_STANDARD 17)

Include(FetchContent)

FetchContent_Declare(
  Catch2
  GIT_REPOSITORY https://github.com/catchorg/Catch2.git
  GIT_TAG        v3.0.1 # or a later release
)
FetchContent_Declare(
  cpprealm
  GIT_REPOSITORY https://github.com/realm/realm-cpp.git
  GIT_TAG        ec62f7f40c445b1a5894191ae0c4bbcd93d9c191
)

FetchContent_MakeAvailable(Catch2 cpprealm)

# add_executable(examples testHelpers.hpp examples.cpp define-object-model.cpp authentication.cpp supported-types.cpp testHelpersTests.cpp)
add_executable(examples examples.cpp define-object-model.cpp authentication.cpp supported-types.cpp)
target_link_libraries(examples PRIVATE Catch2::Catch2WithMain)
target_link_libraries(examples PRIVATE cpprealm)
