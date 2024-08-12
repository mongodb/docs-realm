A :flutter-sdk:`GeoCircle <realm/GeoCircle-class.html>` is a
circular shape whose bounds originate from a central :flutter-sdk:`GeoPoint
<realm/GeoPoint-class.html>`, and has a size corresponding to
a radius measured in radians. You can use the SDK's convenience
:flutter-sdk:`GeoDistance <realm/GeoDistance-class.html>` class to 
easily work with radii in different units.

The default constructor for ``GeoDistance()`` takes a double that represents
a distance in radians. You can use the following convenience methods to create
a ``GeoDistance`` from a different measure:

- ``GeoDistance.fromDegrees(double degrees)``
- ``GeoDistance.fromKilometers(double kilometers)``
- ``GeoDistance.fromMeters(double meters)``
- ``GeoDistance.fromMiles(double miles)``

You can optionally access the distance value in any of these units, represented
as a double.
