The SDK provides specialized non-persistable data types to define shapes:

- :js-sdk:`GeoPoint <types/Realm.GeoPoint.html>`: A type that represents the
  coordinates of a point. A ``GeoPoint`` can be one of three types:
  
  - An object with:
  
    - Latitude: a number value.
    - Longitude: a number value.
    - Altitude: an optional number value.
  - :js-sdk:`CanonicalGeoPoint
    <interfaces/Realm.CanonicalGeoPoint.html>`: an interface that satisfies the
    GeoJSON specifications for a point.
  - :js-sdk:`GeoPosition <types/Realm.GeoPosition.html>`: an array with
    longitude, latitude, and an optional altitude.
