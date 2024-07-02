Use the Background Write API
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can add, modify, or delete objects in the background using 
:swift-sdk:`writeAsync <Structs/Realm.html#/s:10RealmSwift0A0V10writeAsync_10onCompletes6UInt32Vyyc_ys5Error_pSgcSgtF>`. 

With ``writeAsync``, you don't need to pass a :ref:`thread-safe reference 
<sdks-thread-safe-reference>` or :ref:`frozen objects <sdks-frozen-objects>` 
across threads. Instead, call ``realm.writeAsync``. You can provide 
a completion block for the method to execute on the source thread after 
the write completes or fails.

Things to consider when performing background writes:

- Async writes block closing or invalidating the database
- You can explicitly commit or cancel transactions

Wait for Async Writes to Complete
`````````````````````````````````

The SDK provides a ``Bool`` to signal whether the database is currently 
performing an async write. The
:swift-sdk:`isPerformingAsynchronousWriteOperations 
<Structs/Realm.html#/s:10RealmSwift0A0V39isPerformingAsynchronousWriteOperationsSbvp>` 
variable becomes ``true`` after a call to one of:

- ``writeAsync``
- ``beginAsyncWrite``
- ``commitAsyncWrite``

It remains true until all scheduled async write operations have completed.
While this is true, this blocks closing or :swift-sdk:`invalidating 
<Structs/Realm.html#/s:10RealmSwift0A0V10invalidateyyF>` the database.

Commit or Cancel an Async Write
```````````````````````````````

To complete an async write, you or the SDK must call either:

- :swift-sdk:`commitAsyncWrite <Structs/Realm.html#/s:10RealmSwift0A0V16commitAsyncWrite13allowGrouping_s6UInt32VSb_ys5Error_pSgcSgtF>` 
- :swift-sdk:`cancelAsyncWrite <Structs/Realm.html#/s:10RealmSwift0A0V16cancelAsyncWriteyys6UInt32VKF>`

When you use the ``writeAsync`` method, the SDK handles committing or 
canceling the transaction. This provides the convenience of the async write 
without the need to manually keep state tied to the scope of the object. 
However, while in the ``writeAsync`` block, you *can* explicitly call 
``commitAsyncWrite`` or ``cancelAsyncWrite``. If you return without 
calling one of these methods, ``writeAsync`` either:

- Commits the write after executing the instructions in the write block
- Returns an error

In either case, this completes the ``writeAsync`` operation.

For more control over when to commit or cancel the async write transaction, 
use the ``beginAsyncWrite`` method. When you use this method, you must 
explicitly commit the transactions. Returning without committing an async 
write cancels the transaction. ``beginAsyncWrite`` returns an ID that you 
can pass to ``cancelAsyncWrite``.

``commitAsyncWrite`` asynchronously commits a write transaction. This is
the step that persists the data to the database. ``commitAsyncWrite`` can
take an ``onComplete`` block. This block executes on the source thread 
once the commit completes or fails with an error. 

Calling ``commitAsyncWrite`` immediately returns. This allows the caller 
to proceed while the SDK performs the I/O on a background thread. This method 
returns an ID that you can pass to ``cancelAsyncWrite``. This cancels the 
pending invocation of the completion block. It does not cancel the commit 
itself.

You can group sequential calls to ``commitAsyncWrite``. Batching these calls 
improves write performance; particularly when the batched transactions are 
small. To permit grouping transactions, set the ``isGroupingAllowed`` 
parameter to ``true``.

You can call ``cancelAsyncWrite`` on either ``beginAsyncWrite`` or 
``commitAsyncWrite``. When you call it on ``beginAsyncWrite``, this cancels
the entire write transaction. When you call it on ``commitAsyncWrite``, this 
cancels only an ``onComplete`` block you may have passed to 
``commitAsyncWrite``. It does not cancel the commit itself. You need the ID
of the ``beginAsyncWrite`` or the ``commitAsyncWrite`` you want to cancel.

Use Swift Concurrency Features
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Write to an Actor-Isolated Realm
````````````````````````````````

You can use Swift concurrency features to write asynchronously to an 
actor-isolated database. 

The following function is taken from the example ``RealmActor`` defined on the
:ref:`swift-define-realm-actor` page. It shows how you might
write to an actor-isolated database:

.. literalinclude:: /examples/generated/code/start/RealmActor.snippet.write-async.swift
   :language: swift

And you might perform this write using Swift's async syntax:

.. literalinclude:: /examples/generated/code/start/RealmActor.snippet.actor-isolated-realm-async.swift
   :language: swift

This operation does not block or perform I/O on the calling thread. For
more information about writing to a database using Swift concurrency features, 
refer to :ref:`swift-actor-isolated-realm`.

Perform Writes using Async/Await Syntax
```````````````````````````````````````

The :swift-sdk:`asyncWrite() <Structs/Realm.html#/s:10RealmSwift0A0V10asyncWriteyxxyKXEYaKlF>`
API allows for performing async writes using Swift async/await syntax.

The ``asyncWrite()`` API suspends the calling task while waiting for its 
turn to write rather than blocking the thread. In addition, the actual 
I/O to write data to disk is done by a background worker thread. For small 
writes, using this function on the main thread may block the main thread 
for less time than manually dispatching the write to a background thread.
