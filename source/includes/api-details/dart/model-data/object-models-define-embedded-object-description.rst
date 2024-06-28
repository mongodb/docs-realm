In Dart, to define an embedded object, create a class model and add the
`RealmModel <https://pub.dev/documentation/realm_common/latest/realm_common/RealmModel-class.html>`__
annotation. Pass `ObjectType.embeddedObject
<https://pub.dev/documentation/realm_common/latest/realm_common/ObjectType.html>`__
to the ``@RealmModel()`` annotation.

Embedded objects must be nullable when defining them in the parent object's
``RealmModel``. You can use the :flutter-sdk:`parent 
<realm/EmbeddedObjectExtension/parent.html>` property to access the parent of
the embedded object.

Follow the :ref:`sdks-define-objects` procedure detailed on this
page to generate the ``RealmObject`` model and schema definitions.

Then, use the generated ``RealmObject`` model in your application code.

The following example shows how to model an embedded object in a Realm schema.
The ``_Address`` model is embedded within the ``_Person`` model.
