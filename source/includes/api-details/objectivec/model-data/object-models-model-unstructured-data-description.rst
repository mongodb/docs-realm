.. versionadded:: 10.51.0

Starting in SDK version 10.51.0, you can store collections of mixed data
within an ``RLMValue`` property.

To model unstructured data in your app, define the appropriate properties in
your schema as :ref:`RLMValue <sdks-mixed-data-type>` types. You can then
set these ``RLMValue`` properties as a :ref:`list <sdks-list-property-types>`
or a :ref:`dictionary <sdks-dictionary-property-types>` collection of
``RLMValue`` elements.

Note that ``RLMValue`` *cannot* represent a ``RLMSet`` or an embedded
object.
