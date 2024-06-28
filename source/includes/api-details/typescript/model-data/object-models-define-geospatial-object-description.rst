In TypeScript, to create a class that conforms to the GeoJSON spec, you:

1. Create an embedded SDK object. For more information about embedded
   objects, refer to :ref:`sdks-embedded-objects`.

#. At a minimum, add the two fields required by the GeoJSON spec:

   - A field of type ``double[]`` that maps to a "coordinates" (case sensitive) 
     property in the realm schema. 

   - A field of type ``string`` that maps to a "type" property. The value of this 
     field must be "Point".

To simplify geodata persistance, you can define a model that implements 
``CanonicalGeoPoint``, which already has the correct shape. The following 
example shows an embedded class named ``MyGeoPoint`` that is used 
to persist geospatial data:

.. literalinclude::  /examples/generated/node/v12/geospatial.test.snippet.define-geopoint-class.ts
   :language: typescript

Use the Embedded Class
``````````````````````

You then use the custom ``MyGeoPoint`` class in your SDK model, as shown in the 
following example:

.. literalinclude::  /examples/generated/node/v12/geospatial.test.snippet.use-geopoint-class.ts
   :language: typescript

You add instances of your class to the database just like any other SDK 
model. However, in this example, because the ``MyGeoPoint`` class does not 
extend ``Realm.Object``, we must specify ``MyGeoPoint.schema`` when opening 
the database:
