The SDK provides two specialized non-persistable data types to define shapes:

- :flutter-sdk:`GeoPoint <realm/GeoPoint-class.html>`: A class that represents
  the coordinates of a point formed by a pair of doubles consisting of these
  values:
  
  - ``lat``: a double value representing the latitude of a point.
  - ``lon````: a doubble value representing the longitude of a point.
- :flutter-sdk:`GeoDistance <realm/GeoDistance/GeoDistance.html>`: A double
  that represents a distance in radians used to calculate the size of the
  circle shape. ``GeoDistance`` provides convenience methods to simplify
  converting degrees, kilometers, meters, and miles to radians.
