In C++, define an asymmetric object the same way you would 
a regular C++ struct or class. Provide a ``REALM_ASYMMETRIC_SCHEMA`` with the 
struct or class name as the first argument. Add the names of any properties
that you want the database to persist.

An ``asymmetric_object`` broadly has the same :ref:`supported types 
<sdks-supported-data-types>` as ``realm::object``, with a few exceptions:

- Asymmetric objects can link to the following types:
  - ``object``
  - ``embedded_object``
  - ``std::vector<embedded_object>``
