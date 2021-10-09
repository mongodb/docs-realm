{+client-database+} is an reactive, object-oriented, cross-platform,
mobile database. It is an alternative to SQLite and Core Data.

- **Reactive**: you can not only query the current state,
  but subscribe to state changes like the result of a query or even a
  single object.

- **Object-oriented**: stores data as objects, rather than rows,
  documents, or columns.

- **Mobile**: designed for the low-power, battery-sensitive, real-time
  environment of a mobile device.

- **Cross-platform**: use the same {+realm+} files on iOS, Android,
  Linux, macOS, or Windows. Just define a schema for each SDK you use.

Native Database Engine
----------------------

Instead of building on top of an underlying database
engine like SQLite, {+client-database+} is written from
scratch in C++. {+client-database+}'s underlying storage layer uses
:wikipedia:`B+trees <B%2B_tree>` to organize objects. As a result,
{+client-database+} controls optimizations from the storage level all
the way up to the access level.

{+client-database+} stores data in **{+realm+}s**: collections of
heterogeneous {+realm+} objects. You can think of each {+realm+} as a
discrete database. Each object in that {+realm+} is equivalent to a row
in a SQL database.

Column-based storage saves objects as groups of field values. This means
that queries or writes for individual objects can be slower than
row-based storage equivalents when unindexed, but fetching multiple
objects can be much faster due to spatial locality and in-CPU vector
operations.

Inserts and updates write to a new location on disk, then update a
pointer in the underlying B+ tree.

{+client-database+} uses a :wikipedia:`zero-copy <Zero-copy>` design to
make queries faster than an ORM, and often faster than raw SQLite.

Memory Mapping
--------------

Writes use :wikipedia:`memory mapping <Memory-mapped_file>` to avoid
copying data back and forth from memory to storage. Mutators directly
write to disk via memory mapping. Accessors directly read from disk via
memory mapping. This means that object data is never stored on the stack
or heap of your app. By default, data is memory-mapped as read-only to
prevent accidental writes.

{+client-database+} uses operating system level paging to leverage
platform optimizations that the database itself can't reliably implement
on each platform.

Queries
-------

You can query {+client-database+} using platform-native queries or a
raw query language that works across platforms.

Schemas
-------

Every {+realm+} object has a schema. That schema is defined via a native
object in your SDK's language. Object schemas can include embedded lists
and relations between object instances.

Each {+realm+} uses a versioned schema. When that schema changes, you
must define a migration to move object data between schema versions.

Compaction
----------

You should compact your {+realm+}s occasionally to keep them at an
optimal size. You can do this manually, or by configuring your
{+realm+}s to compact on launch. However, {+client-database+} will
reclaim unused space for future writes, so compaction is just an
optimization.

Encryption
----------

{+client-database+} supports on-device {+realm+} encryption.

Persistent or In-Memory
-----------------------

You can use {+client-database+} to store data persistently on disk, or
ephemerally in memory.

ACID Compliance
---------------

{+client-database+} guarantees that transactions are :term:`ACID`
compliant. This means that all committed write
operations are guaranteed to be valid and that clients don't
see transient states in the event of a system crash.

- :wikipedia:`Atomicity <Atomicity_(database_systems)>`: by grouping
  operations in transactions and rolling back all operations in a
  transaction if any of them fail.

- :wikipedia:`Consistency <Consistency_(database_systems)>`: avoids
  data corruption by validating changes against the schema. If the
  result of any write operation is not valid, {+service-short+} cancels
  and rolls back the entire transaction.

- :wikipedia:`Isolation <Isolation_(database_systems)>`: allows only
  one writer at a time. This ensures thread safety between transactions.

- :wikipedia:`Durability <Durability_(database_systems)>`: writes to
  disk immediately when a transaction is committed. In the event of an
  app crash, for example, changes are not lost or corrupted.

Realm Sync
----------

{+sync+} adds network synchronization between a {+backend+} backend and
client devices on top of all of the functionality of {+client-database+}.
When you use {+client-database+} with Sync, {+realm+}s exist on device
just like when you only use {+client-database+}. However, changes to
the data stored in those {+realm+}s synchronize between all client
devices through a backend {+backend+} instance. That backend also stores
{+realm+} data in a cloud-based {+atlas+} cluster running MongoDB.
