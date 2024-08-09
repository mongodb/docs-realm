A :swift-sdk:`GeoPolygon <Typealiases.html#/s:10RealmSwift10GeoPolygona>` is a
polygon shape whose bounds consist of an outer ring, and 0 or more inner holes
to exclude from the geospatial query. 

A polygon's outer ring must contain at least three segments. The last 
and the first :swift-sdk:`GeoPoint <Typealiases.html#/s:10RealmSwift8GeoPointa>`
must be the same, which indicates a closed polygon. This means that it takes
at least four ``GeoPoint`` values to construct a polygon.

Inner holes in a ``GeoPolygon`` must be entirely contained within the
outer ring.
