In the Kotlin SDK, to create a class that conforms to the GeoJSON spec, you:

1. Create an :ref:`embedded object <sdks-embedded-objects>` 
   (a class that inherits from :kotlin-sdk:`EmbeddedRealmObject
   <io.realm.kotlin.types/-embedded-realm-object/index.html>`).

#. At a minimum, add the two fields required by the GeoJSON spec:

   - A field of type ``String`` property that maps to a ``type`` property 
     with the value of ``"Point"``: ``var type: String = "Point"``

   - A field of type ``RealmList<Double>`` that maps to a ``coordinates`` 
     property in the object schema containing a latitude/longitude 
     pair: ``var coordinates: RealmList<Double> = realmListOf()``

The following example shows an embedded class named ``CustomGeoPoint`` that is used 
to persist geospatial data:

.. literalinclude:: /examples/generated/kotlin/Geospatial.snippet.custom-geopoint.kt
   :language: kotlin

Use the Embedded Class
``````````````````````

Use the ``customGeoPoint`` class in your SDK model, as shown in the 
following example:
