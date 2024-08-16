A :js-sdk:`GeoPolygon <types/Realm.GeoPolygon.html>` is a polygon
shape whose bounds consist of an outer ring, and 0 or more inner holes
to exclude from the geospatial query. 

A polygon's outer ring must contain at least three segments. The last 
and the first :js-sdk:`GeoPoint <types/Realm.GeoPoint.html>`
must be the same, which indicates a closed polygon. This means that it takes
at least four ``GeoPoint`` values to construct a polygon.

Inner holes in a ``GeoPolygon`` are optional, and must be entirely contained
within the outer ring. Each ``GeoPoint`` collection in the ``holes?``
collection must contain at least three segments, with the same rules as the
outer ring.
