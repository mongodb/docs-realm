You can index properties of these data types:

- ``bool``
- ``byte``
- ``short``
- ``int``
- ``long``
- ``DateTimeOffset``
- ``char``
- ``string``
- ``ObjectId``
- ``UUID``

To index a property, use the :dotnet-sdk:`Indexed <reference/Realms.IndexedAttribute.html>`
attribute. With the ``Indexed`` attribute, you can specify the type of index
on the property by using the :dotnet-sdk:`IndexType <reference/Realms.IndexType.html>`
enum.

In the following example, we have a default ("General") index on the ``Name``
property:
