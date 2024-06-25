.. code-block:: typescript

       // Find an item whose `_id` matches the ObjectID value passed to 'oid()'.
       "_id == oid(6001c033600510df3bbfd864)"

       // Find an item whose `_id` matches the ObjectID passed as a parameterized query argument.
       "_id == $0", oidValue

       // Find an item whose `id` matches the UUID value passed to 'uuid()'.
       "id == uuid(d1b186e1-e9e0-4768-a1a7-c492519d47ee)"

       // Find an item whose `_id` matches the UUID passed as a parameterized query argument.
       "id == $0", uuidValue
