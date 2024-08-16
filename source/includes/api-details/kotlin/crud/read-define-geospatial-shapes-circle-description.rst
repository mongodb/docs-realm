A :kotlin-sdk:`GeoCircle <io.realm.kotlin.types.geo/-geo-circle/index.html>` is
a circular shape whose bounds originate from a central :kotlin-sdk:`GeoPoint
<io.realm.kotlin.types.geo/-geo-point/index.html>`, and has a size
corresponding to a radius measured in radians. You can use the SDK's
convenience :kotlin-sdk:`Distance
<io.realm.kotlin.types.geo/-distance/index.html>` class to easily work with
radii in different units.

You can use the following convenience methods to create a ``GeoDistance`` from
different measures:

- ``GeoDistance.fromDegrees(double degrees)``
- ``GeoDistance.fromKilometers(double kilometers)``
- ``GeoDistance.fromMiles(double miles)``
- ``GeoDistance.fromRadians(double radians)``

You can optionally access the distance value in any of these units, represented
as a double.
