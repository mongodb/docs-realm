In Dart, to define an asymmetric object, create a class model and add the
`RealmModel <https://pub.dev/documentation/realm_common/latest/realm_common/RealmModel-class.html>`__
annotation. Pass `ObjectType.asymmetricObject
<https://pub.dev/documentation/realm_common/latest/realm_common/ObjectType.html>`__
to the ``@RealmModel()`` annotation.

Follow the :ref:`sdks-define-objects` procedure detailed on this
page to generate the ``RealmObject`` model and schema definitions.

Then, use the generated ``RealmObject`` model in your application code.
