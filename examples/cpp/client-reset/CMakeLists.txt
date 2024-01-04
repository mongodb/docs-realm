cmake_minimum_required(VERSION 3.15)

project(examples-client-reset)

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
  GIT_TAG        077433a5ce78e495c9bccc4b1b99dfa068032f37
)

FetchContent_MakeAvailable(Catch2 cpprealm)

add_executable(examples-client-reset
  client-reset.cpp
)

target_link_libraries(examples-client-reset PRIVATE Catch2::Catch2WithMain)
target_link_libraries(examples-client-reset PRIVATE cpprealm)
