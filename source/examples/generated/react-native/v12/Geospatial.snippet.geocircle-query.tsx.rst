.. code-block:: text

   const realm = useRealm();

   const companiesInSmallCircle = realm
     .objects(Company)
     .filtered('location geoWithin $0', smallCircle);

   const companiesInLargeCircle = realm
     .objects(Company)
     .filtered('location geoWithin $0', largeCircle);
