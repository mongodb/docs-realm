**Map a Model Name**

The Swift SDK does not support mapping a model name to a different name.

**Map a Property Name**

Declare the name you want to use in your project as the ``@Persisted``
property on the object model. Then, pass a dictionary containing the
public and private values for the property names via the
``propertiesMapping()`` function.

In this example, ``firstName`` is the public property name we use in the code
throughout the project to perform CRUD operations. Using the ``propertiesMapping()``
function, we map that to store values using the private property name
``first_name`` in the database. If we write to a synced database, the Sync
schema sees the values stored using the private property name ``first_name``.
