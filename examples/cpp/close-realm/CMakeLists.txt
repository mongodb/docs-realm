cmake_minimum_required(VERSION 3.15)

project(examples-close-realm)

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
  GIT_TAG        32e06db633620bf6276206a2b82f9c2f1453d2a9
)

FetchContent_MakeAvailable(Catch2 cpprealm)

add_executable(examples-close-realm
  close-realm.cpp
)

target_link_libraries(examples-close-realm PRIVATE Catch2::Catch2WithMain)
target_link_libraries(examples-close-realm PRIVATE cpprealm)