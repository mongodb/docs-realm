cmake_minimum_required(VERSION 3.15)

project(examples-beta-local)

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
  GIT_TAG        7c5db1240f9ef5dd3f6eed5df46fe8cf00f132df 
)

FetchContent_MakeAvailable(Catch2 cpprealm)

add_executable(examples-beta-local
  crud.cpp
  filter-data.cpp
  notifications.cpp
  relationships.cpp
  supported-types.cpp
)

target_link_libraries(examples-beta-local PRIVATE Catch2::Catch2WithMain)
target_link_libraries(examples-beta-local PRIVATE cpprealm)
