Starting in SDK version 12.22.0, you can store collections of mixed data
within a ``RealmValue`` property.

To model unstructured data in your app, define the appropriate properties in
your schema as :ref:`RealmValue <sdks-mixed-data-type>` types. You can then
set these ``RealmValue`` properties as a :ref:`list <sdks-list-property-types>`
or a :ref:`dictionary <sdks-dictionary-property-types>` of ``RealmValue``
elements.

Note that ``RealmValue`` *cannot* represent a set or an embedded object.
