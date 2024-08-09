A ``GeoCircle`` is a circular shape whose bounds originate from a central 
:objc-sdk:`RLMGeospatialPoint <Classes/RLMGeospatialPoint.html>`, and has a
size corresponding to a radius measured in radians. You can use the SDK's
convenience :objc-sdk:`RLMDistance <Classes/RLMDistance.html>` object to 
easily work with radii in different units.

``RLMDistance`` enables you to specify the radius distance for your geo shapes 
in one of four units:

- Radians
- Degrees
- Miles
- Kilometers

You can use the supplied convenience methods to convert a measurement to
different distance units.
