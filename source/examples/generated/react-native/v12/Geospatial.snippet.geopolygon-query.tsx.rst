.. code-block:: typescript

   const companiesInBasicPolygon = realm
     .objects(Company)
     .filtered('location geoWithin $0', basicPolygon);

   const companiesInPolygonWithTwoHoles = realm
     .objects(Company)
     .filtered('location geoWithin $0', polygonWithTwoHoles);
