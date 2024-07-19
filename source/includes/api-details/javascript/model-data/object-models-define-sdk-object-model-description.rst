In JavaScript, to define an SDK object, create a JavaScript class that extends
:js-sdk:`Realm.Object <classes/Realm.Object.html>`.

Define a static ``schema`` object that includes a ``name`` property and
a ``properties`` array. The ``name`` becomes the table name in the database.
The ``properties`` array describes the property names, types, and any additional
details about special property behaviors, such as whether the property should
be indexed.

For object types with special behaviors, such as embedded objects and
asymmetric objects, set the optional ``embedded`` or ``asymmetric`` property
to ``true``.
