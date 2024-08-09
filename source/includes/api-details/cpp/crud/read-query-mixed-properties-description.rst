The C++ ``mixed`` data type is a union-like object that can represent a value
any of the supported types. It is implemented using the class template 
`std::variant <https://en.cppreference.com/w/cpp/utility/variant>`__.
This implementation means that a ``mixed`` property holds a value of 
one of its alternative types, or in the case of error - no value.
Your app must handle the type when reading mixed properties.
