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
  GIT_TAG        f4f89d1c75d4c762a679f57d2e9f26e87ec1215b
)

FetchContent_MakeAvailable(Catch2 cpprealm)

add_executable(examples examples.cpp define-object-model.cpp authentication.cpp)
target_link_libraries(examples PRIVATE Catch2::Catch2WithMain)
target_link_libraries(examples PRIVATE cpprealm)
