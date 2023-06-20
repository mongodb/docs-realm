Realm uses a completely unique database engine,
file format, and design. This section describes some of the high-level
details of those choices. This section applies to both the device-local
version of Realm as well as the networked Device Sync version.
Differences between the local database and the synchronized database are
explained in the Atlas Device Sync section.

Native Database Engine
~~~~~~~~~~~~~~~~~~~~~~

Realm is an entire database written from
scratch in C++, instead of building on top of an underlying database
engine like SQLite. Realm's underlying storage layer uses
:wikipedia:`B+ trees <B%2B_tree>` to organize objects. As a result,
Realm controls optimizations from the storage level all
the way up to the access level.

Realm stores data in **realms**: collections of
heterogeneous realm objects. You can think of each realm as a
database. Each object in a realm is equivalent to a row
in a SQL database table or a MongoDB document. Unlike SQL, realms do
not separate different object types into individual tables.

Realm stores objects as groups of property values. We call
this column-based storage. This means that queries or writes for
individual objects can be slower than row-based storage equivalents when
unindexed, but querying a single field across multiple objects or
fetching multiple objects can be much faster due to spatial locality and
in-CPU vector operations.

Realm uses a :wikipedia:`zero-copy <Zero-copy>` design to
make queries faster than an ORM, and often faster than raw SQLite.


Realm Files
~~~~~~~~~~~

Realm persists data in files saved on device
storage. The database uses several kinds of file:

- **realm files**, suffixed with "realm", e.g. :file:`default.realm`:
  contain object data.
- **lock files**, suffixed with "lock", e.g. :file:`default.realm.lock`:
  keep track of which versions of data in a realm are
  actively in use. This prevents realm from reclaiming storage space
  that is still used by a client application. 
- **note files**, suffixed with "note", e.g. :file:`default.realm.note`:
  enable inter-thread and inter-process notifications.
- **management files**, suffixed with "management", e.g. :file:`default.realm.management`:
  internal state management.

Realm files contain object data with the following data structures:
Groups, Tables, Cluster Trees, and Clusters. Realm
organizes these data structures into a tree structure with the following
form:

- The top level, known as a Group, stores object metadata, a transaction
  log, and a collection of Tables.

- Each class in the realm schema corresponds to a Table within the
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
files cannot store references as pointers. Instead, realm files
refer to data using the offset from the beginning of the file. We call
this a ref. As Realm uses memory mapping to read and
write data, database operations translate these refs from offsets to
memory pointers when navigating database structures.

Copy-on-Write: The Secret Sauce of Data Versioning
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Realm uses a technique called **copy-on-write**, which
copies data to a new location on disk for every write operation instead
of overwriting older data on disk. Once the new copy of data is fully
written, the database updates existing references to that data. Older
data is only garbage collected when it is no longer referenced or
actively in use by a client application.

Because of copy-on-write, older copies of data remain valid, since all
of the references in those copies still point to other valid data.
Realm leverages this fact to offer multiple versions of
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

Realm uses operating system level paging, trusting each
operating system to implement memory mapping and persistence better than
a single library could on its own.

Compaction
~~~~~~~~~~

Realm automatically reuses free space that is no longer
needed after database writes. However, realm files never shrink
automatically, even if the amount of data stored in your realm
decreases significantly. Compact your realm to optimize storage
space and decrease file size if possible.

You should compact your realms occasionally to keep them at an
optimal size. You can do this manually, or by configuring your
realms to compact on launch. However, Realm
reclaims unused space for future writes, so compaction is only an
optimization to conserve space on-device.

ACID Compliance
~~~~~~~~~~~~~~~

Realm guarantees that transactions are :wikipedia:`ACID
<ACID>` compliant. This means that all committed write
operations are guaranteed to be valid and that clients don't
see transient states in the event of a system crash. Realm
complies with ACID with the following design choices:

- :wikipedia:`Atomicity <Atomicity_(database_systems)>`: groups
  operations in transactions and rolls back all operations in a
  transaction if any of them fail.

- :wikipedia:`Consistency <Consistency_(database_systems)>`: avoids
  data corruption by validating changes against the schema. If the
  result of any write operation is not valid, Realm cancels
  and rolls back the entire transaction.

- :wikipedia:`Isolation <Isolation_(database_systems)>`: allows only
  one writer at a time. This ensures thread safety between transactions.

- :wikipedia:`Durability <Durability_(database_systems)>`: writes to
  disk immediately when a transaction is committed. In the event of an
  app crash, for example, changes are not lost or corrupted.
