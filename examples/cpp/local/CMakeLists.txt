cmake_minimum_required(VERSION 3.15)

project(examples-local)

set(CMAKE_CXX_STANDARD 17)

Include(FetchContent)

FetchContent_Declare(
  Catch2
  GIT_REPOSITORY https://github.com/catchorg/Catch2.git
  GIT_TAG        v3.5.0 # or a later release
)
FetchContent_Declare(
  cpprealm
  GIT_REPOSITORY https://github.com/realm/realm-cpp.git
  GIT_TAG        080ad8f73c2887e6bd0a61edf35177430ba191a0
)

FetchContent_MakeAvailable(Catch2 cpprealm)

add_executable(examples-local
  crud.cpp
  filter-data.cpp
  notifications.cpp
  realm-files.cpp
  relationships.cpp
  supported-types.cpp
  threading.cpp
)

set(USE_EXAMPLE_MAIN 1)

target_link_libraries(examples-local PRIVATE Catch2::Catch2WithMain)
target_link_libraries(examples-local PRIVATE cpprealm)
