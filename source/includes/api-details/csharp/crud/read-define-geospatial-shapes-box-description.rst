A :dotnet-sdk:`GeoBox <reference/Realms.GeoBox.html>` is a
rectangular shape whose bounds are determined by :dotnet-sdk:`GeoPoint
<reference/Realms.GeoPoint.html>` coordinates for a bottom-left
and a top-right corner.

In C#, you can optionally construct a ``GeoBox`` from a set of four doubles,
which represent:

- ``left``: The longitude of the left edge of the rectangle.
- ``top``: The latitude of the top edge of the rectangle.
- ``right``: The longitude of the right edge of the rectangle.
- ``bottom``: The latitude of the bottom edge of the rectangle.
