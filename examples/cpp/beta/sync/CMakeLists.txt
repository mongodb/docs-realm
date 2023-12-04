cmake_minimum_required(VERSION 3.15)

project(examples-beta-sync)

set(CMAKE_CXX_STANDARD 17)

Include(FetchContent)

FetchContent_Declare(
  Catch2
  GIT_REPOSITORY https://github.com/catchorg/Catch2.git
  GIT_TAG        v3.4.0 # or a later release
)
FetchContent_Declare(
  cpprealm
  GIT_REPOSITORY https://github.com/realm/realm-cpp.git
  GIT_TAG        v0.5.0-preview
)

FetchContent_MakeAvailable(Catch2 cpprealm)

add_executable(examples-beta-sync 
  app.cpp
  authentication.cpp
  call-function.cpp
  custom-user-data.cpp
  flexible-sync.cpp
  quick-start.cpp
  sync-errors.cpp
)

target_link_libraries(examples-beta-sync PRIVATE Catch2::Catch2WithMain)
target_link_libraries(examples-beta-sync PRIVATE cpprealm)
