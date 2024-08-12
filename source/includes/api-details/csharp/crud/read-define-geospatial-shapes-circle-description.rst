A :dotnet-sdk:`GeoCircle <reference/Realms.GeoCircle.html>` is a
circular shape whose bounds originate from a central :dotnet-sdk:`GeoPoint
<reference/Realms.GeoPoint.html>`, and has a size corresponding to
a radius measured in radians. You can use the SDK's convenience
:dotnet-sdk:`Distance <reference/Realms.Distance.html>` structure to 
easily work with radii in different units.

You can construct a ``Distance`` with a radius measurement in one of four units:

- ``FromDegrees(double)``
- ``FromKilometers(double)``
- ``FromMiles(double)``
- ``FromRadians(double)``
