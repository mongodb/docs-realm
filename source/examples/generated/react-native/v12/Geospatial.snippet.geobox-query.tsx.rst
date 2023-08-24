.. code-block:: text

   const companiesInLargeBox = realm
     .objects(Company)
     .filtered('location geoWithin $0', largeBox);

   const companiesInSmallBox = realm
     .objects(Company)
     .filtered('location geoWithin $0', smallBox);
