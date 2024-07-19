Use the `Backlink <https://pub.dev/documentation/realm_common/latest/realm_common/Backlink-class.html>`__
property annotation to define an inverse relationship.
Pass a `Symbol <https://api.dart.dev/stable/2.18.4/dart-core/Symbol/Symbol.html>`__
of the field name of the to-one or to-many field for which you are creating the
backlink as an argument to ``Backlink()``. Include an ``Iterable`` of the
object model you are backlinking to in the field below the annotation.
