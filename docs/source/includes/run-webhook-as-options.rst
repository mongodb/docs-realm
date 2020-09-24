There are three ways to configure the execution user:

- :guilabel:`System`: The execution user is the :ref:`system user
  <system-user>`, which has full access to MongoDB CRUD and
  Aggregation APIs and is not affected by any rules, roles,
  or permissions.

- :guilabel:`User Id`: You select a specific application user to execute the function.

- :guilabel:`Script`: You define a :doc:`function </functions>` that
  returns the ``id`` of the execution user.
