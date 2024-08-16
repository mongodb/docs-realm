The SDK provides two specialized non-persistable data types to define shapes:

- :kotlin-sdk:`GeoPoint <io.realm.kotlin.types.geo/-geo-point/index.html>`: An
  interface that represents the coordinates of a point formed by a pair of
  doubles consisting of these values:
  
  - Latitude: ranges between -90 and 90 degrees, inclusive.
  - Longitude: ranges between -180 and 180 degrees, inclusive.
- :kotlin-sdk:`Distance <io.realm.kotlin.types.geo/-distance/index.html>`: A
  class that represents a distance used to calculate the size of the
  circle shape. ``Distance`` provides convenience methods to simplify
  converting degrees, kilometers, miles, and radians to and from the
  ``Distance`` measure.
