A read from a realm consists of the following steps:

- Get all objects of a certain type from the realm.
- Optionally, filter the results using RQL or the Fluent query interface.
- Optionally, sort the results.

All query, filter, and sort operations return a
live results collection.