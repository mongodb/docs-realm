You can save a compacted (and optionally :ref:`encrypted
<ios-encrypt-a-realm>`) copy of a realm to another file location
with the :swift-sdk:`Realm.writeCopy(toFile:encryptionKey:)
<Structs/Realm.html#/s:10RealmSwift0A0V9writeCopy6toFile13encryptionKeyy10Foundation3URLV_AG4DataVSgtKF>`
method. The destination file cannot already exist.

.. important::

    Avoid calling this method within a :ref:`write transaction
    <ios-write-transactions>`. If called within a write transaction, this
    method copies the absolute latest data. This includes any
    **uncommitted** changes you made in the transaction before this
    method call.