.. versionadded:: 2.0.0

Starting in Kotlin SDK version 2.0.0, you can store
collections of mixed data within a  ``RealmAny`` property.

To model unstructured data in your app, define the appropriate properties in
your schema as :ref:`RealmAny <sdks-mixed-data-type>` types. You can then set
these ``RealmAny`` properties as a :ref:`list <sdks-list-property-types>` or a
:ref:`dictionary <sdks-dictionary-property-types>` collection of ``RealmAny``
elements.

Note that ``RealmAny`` *cannot* represent a ``RealmSet`` or an embedded object.
