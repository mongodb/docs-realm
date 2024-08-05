Query operations return a :swift-sdk:`results collection
<Structs/Results.html>`. Results collections may be either live or frozen.

- **Live results** always contain the latest results of the associated query.
- **Frozen results** represent a snapshot that cannot be modified and doesn't
  reflect the latest changes to the database.
