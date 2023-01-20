
.. include:: /includes/realm-overview.rst

Database Internals
------------------

.. include:: /includes/realm-database-internals.rst

Features
--------

Realm Database supports many popular database features.

Queries
~~~~~~~

You can query Realm Database using platform-native queries or a
raw query language that works across platforms.

Encryption
~~~~~~~~~~

Realm Database supports on-device realm encryption. Since
memory mapping does not support encryption, encrypted realms use a
simulated in-library form of memory mapping instead.

.. note::

   Realm forbids opening the same encrypted realm from multiple processes.
   Attempting to do so will throw the error:
   "Encrypted interprocess sharing is currently unsupported."

Indexes
~~~~~~~

Indexes are implemented as trees containing values of a given property
instead of a unique internal object key. This means that indexes only
support one column, and thus only one property, at a time.

Schemas
~~~~~~~

Every realm object has a schema. That schema is defined via a native
object in your SDK's language. Object schemas can include embedded lists
and relations between object instances.

Each realm uses a versioned schema. When that schema changes, you
must define a migration to move object data between schema versions.
Non-breaking schema changes, also referred to as additive schema changes, 
do not require a migration. After you increment the local schema version, 
you can begin using the updated schema in your app. Breaking schema 
changes, also called destructive schema changes, require a migration function.

See your SDK's documentation for more information on migrations.

Persistent or In-Memory Realms
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can use Realm Database to store data persistently on disk, or
ephemerally in memory. Ephemeral realms can be useful in situations
where you don't need to persist data between application instances, such
as when a user works in a temporary workspace.

Atlas Device Sync
-----------------

.. include:: /includes/sync-internals.rst
