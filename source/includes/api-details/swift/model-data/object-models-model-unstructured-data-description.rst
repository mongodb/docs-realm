.. versionadded:: 10.51.0

Starting in SDK version 10.51.0, you can store collections of mixed data
within a ``AnyRealmValue`` property. 

To model unstructured data in your app, define the appropriate properties in
your schema as :ref:`AnyRealmValue <sdks-mixed-data-type>` types. You can then
set these ``AnyRealmValue`` properties as a :ref:`list <sdks-list-property-types>`
or a :ref:`dictionary <sdks-dictionary-property-types>` collection of
``AnyRealmValue`` elements.

Note that ``AnyRealmValue`` *cannot* represent a ``MutableSet`` or an embedded
object.
