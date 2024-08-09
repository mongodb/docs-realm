The SDK provides two specialized non-persistable data types to define shapes:

- :objc-sdk:`RLMGeospatialPoint <Classes/RLMGeospatialPoint.html>`: A
  class that represents the coordinates of a point formed by a pair of
  doubles consisting of these values:
  
  - Latitude: ranges between -90 and 90 degrees, inclusive.
  - Longitude: ranges between -180 and 180 degrees, inclusive.
  - Altitude (optional): cannot be a negative value.
- :objc-sdk:`RLMDistance <Classes/RLMDistance.html>`: A helper to represent
  and convert a distance.
