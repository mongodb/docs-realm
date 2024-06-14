You can save a compacted (and optionally :ref:`encrypted
<sdks-encrypt-database>`) copy of a database file to another file location
with the :kotlin-sdk:`Realm.writeCopyTo
<io.realm.kotlin/-realm/write-copy-to.html>`
method. The destination file cannot already exist.

.. important::

    Avoid calling ``writeCopyTo`` within a :ref:`write transaction
    <sdks-crud-create>`. If called within a write transaction, this
    method copies the absolute latest data. This includes any
    **uncommitted** changes you made in the transaction before this
    method call.
