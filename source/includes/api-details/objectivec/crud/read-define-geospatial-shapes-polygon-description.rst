A :objc-sdk:`RLMGeospatialPolygon <Classes/RLMGeospatialPolygon.html>` is a
polygon shape whose bounds consist of an outer ring, and 0 or more inner holes
to exclude from the geospatial query. 

A polygon's outer ring must contain at least three segments. The last 
and the first :objc-sdk:`RLMGeospatialPoint <Classes/RLMGeospatialPoint.html>`
must be the same, which indicates a closed polygon. This means that it takes
at least four ``RLMGeospatialPoint`` values to construct a polygon.

Inner holes in a ``RLMGeospatialPolygon`` must be entirely contained within the
outer ring.
