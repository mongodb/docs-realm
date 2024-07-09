.. versionadded:: 2.0.0

Starting in Flutter SDK version 2.0.0, you can store
collections of mixed data within a ``RealmValue`` property. 

To model unstructured data in your app, define the appropriate properties in
your schema as :ref:`RealmValue <sdks-mixed-data-type>` types. You can then set
these ``RealmValue`` properties as a :ref:`RealmList <sdks-list-property-types>`
or a :ref:`RealmMap <sdks-dictionary-property-types>` collection of
``RealmValue`` elements.

Note that ``RealmValue`` *cannot* represent a ``RealmSet`` or an embedded object.

For example, you might use a ``RealmValue`` that contains a map of mixed
data when modeling a variable event log object.
