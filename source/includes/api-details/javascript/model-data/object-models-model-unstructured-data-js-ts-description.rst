.. versionadded:: 12.9.0

Starting in Node.js SDK version 12.9.0, you can store
collections of mixed data within a ``mixed`` property.

To model unstructured data in your app, define the appropriate properties in
your schema as :ref:`mixed <sdks-mixed-data-type>` types. You can then set these
``mixed`` properties as a :ref:`list <sdks-list-property-types>` or a
:ref:`dictionary <sdks-dictionary-property-types>` collection of mixed elements.

Note that ``mixed`` *cannot* represent a set or an embedded object.
