You can query geospatial data in two ways:

- Using the :dotnet-sdk:`GeoWithin()
  <reference/Realms.QueryMethods.html#Realms_QueryMethods_GeoWithin_Realms_IEmbeddedObject_Realms_GeoShapeBase_>`
  operator with the :ref:`LINQ <sdks-dotnet-linq>` query engine.
- Using the :dotnet-sdk:`Filter()
  <reference/Realms.CollectionExtensions.html?q=Filter>` method with the
  :ref:`Realm Query Language <rql-geospatial>` ``geoWithin`` operator.

The examples below show the results of queries using these two ``Company``
objects.
