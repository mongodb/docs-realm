You can save a compacted (and optionally :ref:`encrypted
<sdks-encrypt-database>`) copy of a realm to another file location
with the :js-sdk:`Realm.writeCopyTo()
<Realm.html#writeCopyTo>`
method. The destination file cannot already exist.

.. important::

    Avoid calling ``writeCopyTo()`` within a :ref:`write transaction
    <sdks-crud-create>`. If called within a write transaction, this
    method copies the absolute latest data. This includes any
    **uncommitted** changes you made in the transaction before this
    method call.
    