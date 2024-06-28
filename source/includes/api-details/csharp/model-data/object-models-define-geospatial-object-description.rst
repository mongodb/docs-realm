In C#, to create a class that conforms to the GeoJSON spec:

1. Create an embedded object (a class that inherits from 
   :dotnet-sdk:`IEmbeddedObject <reference/Realms.IEmbeddedObject.html>`).

#. At a minimum, add the two fields required by the GeoJSON spec:

   - A field of type ``IList<double>`` that maps to a "coordinates" (case sensitive) 
     property in the realm schema. 

   - A field of type ``string`` that maps to a "type" property. The value of this 
     field must be "Point".

The following example shows an embedded class named "CustomGeoPoint" that is used 
to persist GeoPoint data:

.. literalinclude:: /examples/generated/dotnet/CustomGeoPoint.snippet.customgeopoint.cs
   :language: csharp

Use the Embedded Class
``````````````````````

You then use the custom GeoPoint class in your Realm object model, as shown in
the following example.
