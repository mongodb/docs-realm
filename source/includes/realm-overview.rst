Realm Database is a reactive, object-oriented, cross-platform,
mobile database:

- **Reactive**: query the current state of data
  and subscribe to state changes like the result of a query, or even
  changes to a single object.

- **Object-oriented**: organizes data as objects, rather than rows,
  documents, or columns.

- **Cross-platform**: use the same database on iOS, Android,
  Linux, macOS, or Windows. Just define a schema for each SDK you use.

- **Mobile**: designed for the low-power, battery-sensitive, real-time
  environment of a mobile device.

Realm Database is a cross-platform and mobile-optimized alternative to other
mobile databases such as `SQLite <https://www.sqlite.org/index.html>`__,
:apple:`Core Data <documentation/coredata>`, and :android:`Room
<jetpack/androidx/releases/room>`.

This page explains some of the implementation details and inner workings
of Realm Database and Device Sync. This page is for you if you are:

- a developer interested in learning more about Realm Database

- comparing Realm Database with competing databases

- trying to understand how Realm Database works with
  Device Sync

This explanation begins with a deep dive into database internals,
continues with a high-level introduction to some of the features of
Realm Database, and wraps up with some of the differences of working 
with Device Sync and the local version of Realm Database.
