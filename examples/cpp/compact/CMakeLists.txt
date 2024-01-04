cmake_minimum_required(VERSION 3.15)

project(examples-compact)

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
  GIT_TAG        d85365a3e49030cf96d742c351e42bbde5070e06
)

FetchContent_MakeAvailable(Catch2 cpprealm)

add_executable(examples-compact
  compact.cpp
)

target_link_libraries(examples-compact PRIVATE Catch2::Catch2WithMain)
target_link_libraries(examples-compact PRIVATE cpprealm)