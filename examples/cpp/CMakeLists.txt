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
  GIT_TAG        74a363814de3bf28cd191306b9af65222fc18d0c
)

FetchContent_MakeAvailable(Catch2 cpprealm)

add_executable(examples 
  asymmetric-sync.cpp
  authentication.cpp 
  define-object-model.cpp 
  examples.cpp 
  filter-data.cpp 
  flexible-sync.cpp 
  quick-start.cpp 
  supported-types.cpp
)

target_link_libraries(examples PRIVATE Catch2::Catch2WithMain)
target_link_libraries(examples PRIVATE cpprealm)
