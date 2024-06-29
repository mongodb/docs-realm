In C++, the base :cpp-sdk:`object <structrealm_1_1internal_1_1bridge_1_1object.html>`
provides accessors and other methods to work with SDK objects, including
things like:

- Checking whether an object is valid
- Getting its managing database instance
- Registering a notification token

Define a C++ struct or class as you would normally. Add a ``REALM_SCHEMA``
whose first value is the name of the struct or class. Add the names of the
properties that you want the database to manage. Omit any fields that you do
not want to persist.
