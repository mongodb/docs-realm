The C++ SDK object model is a regular C++ class or struct that contains
a collection of properties. When you define your C++ class or struct, you
must also provide an object schema. The schema is a C++ macro that gives the
SDK information about which properties to persist, and what type of database
object it is.

You must define your SDK object model within the ``realm`` namespace.
