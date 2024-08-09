Query operations return a :flutter-sdk:`results collection
<realm/RealmResults-class.html>`.

Results collections may be either live or frozen.

- **Live results** always contain the latest results of the associated query.
- **Frozen results** represent a snapshot that cannot be modified and doesn't
  reflect the latest changes to the database.
