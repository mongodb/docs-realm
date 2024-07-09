To ignore a property, add the `Ignored <https://pub.dev/documentation/realm_common/latest/realm_common/Ignored-class.html>`__
annotation to the property in your ``RealmModel``. When you 
:ref:`generate the model <sdks-define-objects>`, the object generator doesn't
include the property in the ``RealmObject`` schema or persist it to the
database.
