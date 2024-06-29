In Dart, to create a class that conforms to the GeoJSON spec, you:

1. Create an embedded object. For more information about embedded
   objects, refer to :ref:`sdks-object-models`.

#. At a minimum, add the two fields required by the GeoJSON spec:

   - A field of type ``double[]`` that maps to a "coordinates" (case sensitive) 
     property in the schema. 

   - A field of type ``string`` that maps to a "type" property. The value of this 
     field must be "Point".

The following example shows an embedded class named ``MyGeoPoint`` that is 
used to persist geospatial data:

.. literalinclude:: /examples/generated/flutter/geospatial_data_test.snippet.define-geopoint-class.dart
   :language: dart

Use the Embedded Class
```````````````````````

You then use the custom ``MyGeoPoint`` class in your data model, as shown 
in the following example:
