:dotnet-sdk:`Query operations <linqsupport.html>`
return an ``IQueryable<T>``, which represents a collection of all objects
of the given type in the database. This collection may be either live or frozen.

- **Live results** always contain the latest results of the associated query.
- **Frozen results** represent a snapshot that cannot be modified and doesn't
  reflect the latest changes to the database.
