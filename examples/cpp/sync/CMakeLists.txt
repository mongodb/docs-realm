cmake_minimum_required(VERSION 3.25)

project(examples-beta-sync)

set(CMAKE_CXX_STANDARD 17)

Include(FetchContent)

FetchContent_Declare(
  Catch2
  GIT_REPOSITORY https://github.com/catchorg/Catch2.git
  GIT_TAG        v3.5.0
)
FetchContent_Declare(
  cpprealm
  GIT_REPOSITORY https://github.com/realm/realm-cpp.git
  GIT_TAG        948b98325c839d633b3859046c0c58e88fe3513d
)

FetchContent_MakeAvailable(Catch2 cpprealm)

add_executable(examples-beta-sync 
  app.cpp
  #authentication.cpp
)

target_link_libraries(examples-beta-sync PRIVATE Catch2::Catch2WithMain)
target_link_libraries(examples-beta-sync PRIVATE cpprealm)
