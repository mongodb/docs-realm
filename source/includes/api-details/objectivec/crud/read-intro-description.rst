Query operations return a :objc-sdk:`results collection
<Classes/RLMResults.html>`.

Results collections may be either live or frozen.

- **Live results** always contain the latest results of the associated query.
- **Frozen results** represent a snapshot that cannot be modified and doesn't
  reflect the latest changes to the database.
