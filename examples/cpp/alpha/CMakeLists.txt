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
  GIT_TAG        v0.1.1-alpha 
)

FetchContent_MakeAvailable(Catch2 cpprealm)

add_executable(examples 
  crud.cpp
  define-object-model.cpp
  filter-data.cpp 
  logger.cpp
  notifications.cpp
  open-realm.cpp
  quick-start.cpp 
  supported-types.cpp
  threading.cpp
)

target_link_libraries(examples PRIVATE Catch2::Catch2WithMain)
target_link_libraries(examples PRIVATE cpprealm)
