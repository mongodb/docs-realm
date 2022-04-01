{+client-database+} is a reactive, object-oriented, cross-platform,
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

{+client-database+} is an alternative to
`SQLite <https://www.sqlite.org/index.html>`__ and
:apple:`Core Data <documentation/coredata>`.

This page explains some of the implementation details and inner workings
of {+client-database+} and {+sync+}. This page is for you if you are:

- a developer interested in learning more about {+client-database+}

- comparing {+client-database+} with competing databases

- trying to understand the difference between {+client-database+} and
  {+sync+}

This explanation begins with a deep dive into database internals,
continues with a high-level introduction to some of the features of
{+client-database+}, and wraps up with some of the differences between
{+sync+} and the local version of {+client-database+}.

Database Internals
------------------

{+client-database+} uses a completely unique database engine,
file format, and design. This section describes some of the high-level
details of those choices. This section applies to both the device-local
version of {+client-database+} as well as the networked {+sync+} version.
Differences between the local database and the synchronized database are
explained in the Realm Sync section.

Native Database Engine
~~~~~~~~~~~~~~~~~~~~~~

{+client-database+} is an entire database written from
scratch in C++, instead of building on top of an underlying database
engine like SQLite. {+client-database+}'s underlying storage layer uses
:wikipedia:`B+ trees <B%2B_tree>` to organize objects. As a result,
{+client-database+} controls optimizations from the storage level all
the way up to the access level.

{+client-database+} stores data in **{+realm+}s**: collections of
heterogeneous {+realm+} objects. You can think of each {+realm+} as a
database. Each object in a {+realm+} is equivalent to a row
in a SQL database table or a MongoDB document. Unlike SQL, {+realm+}s do
not separate different object types into individual tables.

{+client-database+} stores objects as groups of property values. We call
this column-based storage. This means that queries or writes for
individual objects can be slower than row-based storage equivalents when
unindexed, but querying a single field across multiple objects or
fetching multiple objects can be much faster due to spatial locality and
in-CPU vector operations.

{+client-database+} uses a :wikipedia:`zero-copy <Zero-copy>` design to
make queries faster than an ORM, and often faster than raw SQLite.


Realm Files
~~~~~~~~~~~

{+client-database+} persists data in files saved on device
storage. The database uses several kinds of file:

- **realm files**, suffixed with "realm", e.g. :file:`default.realm`:
  contain object data.
- **lock files**, suffixed with "lock", e.g. :file:`default.realm.lock`:
  keep track of which versions of data in a {+realm+} are
  actively in use. This prevents {+realm+} from reclaiming storage space
  that is still used by a client application. 
- **note files**, suffixed with "note", e.g. :file`default.realm.note`:
  enable inter-thread and inter-process notifications.
- **management files**, suffixed with "management", e.g. :file:`default.realm.management`:
  internal state management.

Realm files contain object data with the following data structures:
Groups, Tables, Cluster Trees, and Clusters. {+client-database+}
organizes these data structures into a tree structure with the following
form:

- The top level, known as a Group, stores object metadata, a transaction
  log, and a collection of Tables.

- Each class in the {+realm+} schema corresponds to a Table within the
  top-level Group.

- Each Table contains a Cluster Tree, an implementation of a B+ tree.

- Leaves on the Cluster Tree are called Clusters. Each contains a range
  of objects sorted by key value.

- Clusters store objects as collections of columns.

- Each column contains data for a single property for multiple instances
  of a given object. Columns are arrays of data with uniformly sized
  values.

- Columns store data in one of the following sizes: 1, 2, 4, 8, 16, 32,
  or 64 bits. Each column uses one value size, determined by the largest
  value.

Since pointers refer to memory addresses, objects written to persistent
files cannot store references as pointers. Instead, {+realm+} files
refer to data using the offset from the beginning of the file. We call
this a ref. As {+client-database+} uses memory mapping to read and
write data, database operations translate these refs from offsets to
memory pointers when navigating database structures.

Copy-on-Write: The Secret Sauce of Data Versioning
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

{+client-database+} uses a technique called **copy-on-write**, which
copies data to a new location on disk for every write operation instead
of overwriting older data on disk. Once the new copy of data is fully
written, the database updates existing references to that data. Older
data is only garbage collected when it is no longer referenced or
actively in use by a client application.

Because of copy-on-write, older copies of data remain valid, since all
of the references in those copies still point to other valid data.
{+client-database+} leverages this fact to offer multiple versions of
data simultaneously to different threads in client applications. Most
applications tie data refreshes to the repaint cycle of the looper
thread that controls the UI, since data only needs to refresh as often
as the UI does. Longer-running procedures on background threads,
such as large write operations, can work with a single version of data
for a longer period of time before committing their changes.

Memory Mapping
~~~~~~~~~~~~~~

Writes use :wikipedia:`memory mapping <Memory-mapped_file>` to avoid
copying data back and forth from memory to storage. Accessors and
mutators read and write to disk via memory mapping. As a result, object
data is never stored on the stack or heap of your app. By default, data
is memory-mapped as read-only to prevent accidental writes.

{+client-database+} uses operating system level paging, trusting each
operating system to implement memory mapping and persistence better than
a single library could on its own.

Compaction
~~~~~~~~~~

{+client-database+} automatically reuses free space that is no longer
needed after database writes. However, {+realm+} files never shrink
automatically, even if the amount of data stored in your {+realm+}
decreases significantly. Compact your {+realm+} to optimize storage
space and decrease file size if possible.

You should compact your {+realm+}s occasionally to keep them at an
optimal size. You can do this manually, or by configuring your
{+realm+}s to compact on launch. However, {+client-database+}
reclaims unused space for future writes, so compaction is only an
optimization to conserve space on-device.

ACID Compliance
~~~~~~~~~~~~~~~

{+client-database+} guarantees that transactions are :wikipedia:`ACID
<ACID>` compliant. This means that all committed write
operations are guaranteed to be valid and that clients don't
see transient states in the event of a system crash. {+client-database+}
complies with ACID with the following design choices:

- :wikipedia:`Atomicity <Atomicity_(database_systems)>`: groups
  operations in transactions and rolls back all operations in a
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

Features
--------

{+client-database+} supports many popular database features.

Queries
~~~~~~~

You can query {+client-database+} using platform-native queries or a
raw query language that works across platforms.

Encryption
~~~~~~~~~~

{+client-database+} supports on-device {+realm+} encryption. Since
memory mapping does not support encryption, encrypted {+realm+}s use a
simulated in-library form of memory mapping instead.

.. note::

   Realm forbids opening the same encrypted realm from multiple processes.
   Attempting to do so will throw the error:
   "{+encrypted-interprocess-sharing-error-message+}"

Indexes
~~~~~~~

Indexes are implemented as trees containing values of a given property
instead of a unique internal object key. This means that indexes only
support one column, and thus only one property, at a time.

Schemas
~~~~~~~

Every {+realm+} object has a schema. That schema is defined via a native
object in your SDK's language. Object schemas can include embedded lists
and relations between object instances.

Each {+realm+} uses a versioned schema. When that schema changes, you
must define a migration to move object data between schema versions.
Non-breaking schema changes, also referred to as additive schema changes, 
do not require a migration. After you increment the local schema version, 
you can begin using the updated schema in your app. Breaking schema 
changes, also called destructive schema changes, require a migration function.

See your SDK's documentation for more information on migrations.

Persistent or In-Memory Realms
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can use {+client-database+} to store data persistently on disk, or
ephemerally in memory. Ephemeral {+realm+}s can be useful in situations
where you don't need to persist data between application instances, such
as when a user works in a temporary workspace.

Realm Sync
----------

{+sync+} adds network synchronization between a {+backend+} backend and
client devices on top of all of the functionality of {+client-database+}.
When you use {+client-database+} with Sync, {+realm+}s exist on device
just like when you only use {+client-database+}. However, changes to
the data stored in those {+realm+}s synchronize between all client
devices through a backend {+backend+} instance. That backend also stores
{+realm+} data in a cloud-based {+atlas+} cluster running MongoDB.

{+sync+} relies on a worker client that communicates with your
application backend in a dedicated thread in your application.
Additionally, synced {+realm+}s keep a history of changes to contained
objects. Sync uses this history to resolve conflicts between client
changes and backend changes.

Applications that use {+sync+} define their schema on the backend using
`JSON Schema <https://json-schema.org/learn/getting-started-step-by-step.html>`__.
Client applications must match that backend schema to synchronize data.
However, if you prefer to define your initial schema in your application's
programming language, you can use :ref:`Development Mode
<concept-development-mode>` to create a backend JSON Schema based on
native SDK objects as you write your application. However, once your
application is used for production purposes, you should alter your
schema using JSON Schema on the backend.
