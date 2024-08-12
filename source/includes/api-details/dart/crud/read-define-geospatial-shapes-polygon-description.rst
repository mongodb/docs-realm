A :flutter-sdk:`GeoPolygon <realm/GeoPolygon-class.html>` is a polygon
shape whose bounds consist of an outer ring of type :flutter-sdk:`GeoRing
<realm/GeoRing.html>`, and 0 or more inner holes to exclude from the
geospatial query.

The ``GeoRing`` is a list of three or more :flutter-sdk:`GeoPoint
<reference/Realms.GeoPoint.html>` coordinates. The last 
and the first ``GeoPoint`` must be the same, which indicates a closed ring.
This means that it takes at least four ``GeoPoint`` values to construct a
polygon.

Inner holes in a ``GeoPolygon`` are optional, and must be entirely contained
within the outer ring. Each ``GeoRing`` collection in the ``holes`` collection
must contain at least three segments, with the same rules as the outer ring.
