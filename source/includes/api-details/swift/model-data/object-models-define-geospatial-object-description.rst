To persist geospatial data with the Swift SDK, create a GeoJSON-compatible
embedded class that you can use in your data model.

Your custom embedded object must contain the two fields required by the
GeoJSON spec:

- A field of type ``String`` property that maps to a ``type`` property with
  the value of ``"Point"``: ``@Persisted var type: String = "Point"``

- A field of type ``List<Double>`` that maps to a ``coordinates``
  property containing a latitude/longitude pair:
  ``@Persisted private var coordinates: List<Double>``
