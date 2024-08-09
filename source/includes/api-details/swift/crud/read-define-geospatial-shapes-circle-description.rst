A :swift-sdk:`GeoCircle <Typealiases.html#/s:10RealmSwift9GeoCirclea>` is a
circular shape whose bounds originate from a central :swift-sdk:`GeoPoint
<Typealiases.html#/s:10RealmSwift8GeoPointa>`, and has a size corresponding to
a radius measured in radians. You can use the SDK's convenience
:swift-sdk:`Distance <Typealiases.html#/s:10RealmSwift8Distancea>` structure to 
easily work with radii in different units.

``Distance`` enables you to specify the radius distance for your geo shapes 
in one of four units:

- ``.degrees``
- ``.kilometers``
- ``.miles``
- ``.radians``

You can optionally use the supplied convenience methods to convert a 
measurement to a different distance units.
