.. code-block:: typescript

   const realm = useRealm();

   const companiesInBasicPolygon = realm
     .objects(Company)
     .filtered('location geoWithin $0', basicPolygon);

   const companiesInPolygonWithTwoHoles = realm
     .objects(Company)
     .filtered('location geoWithin $0', polygonWithTwoHoles);
