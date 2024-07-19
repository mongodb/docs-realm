C++ supports primary keys of the following types, and their optional variants:

- ``int64_t``
- ``realm::object_id``
- ``realm::uuid``
- ``std::string``

Additionally, a required ``realm::enum`` property can be a primary key, but
``realm::enum`` cannot be optional if it is used as a primary key.

Set a property as a primary key with the ``primary_key`` template.
