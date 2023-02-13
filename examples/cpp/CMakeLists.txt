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
  GIT_TAG        f5bdef8e958612143dea3615a0ba5d1b9eeddd36
)

FetchContent_MakeAvailable(Catch2 cpprealm)

# add_executable(examples testHelpers.hpp testHelpersTests.cpp authentication.cpp define-object-model.cpp examples.cpp flexible-sync.cpp supported-types.cpp)
add_executable(examples authentication.cpp define-object-model.cpp examples.cpp filter-data.cpp flexible-sync.cpp supported-types.cpp)

target_link_libraries(examples PRIVATE Catch2::Catch2WithMain)
target_link_libraries(examples PRIVATE cpprealm)
