Ignore a field from an SDK object model with the
:java-sdk:`@Ignore <io/realm/annotations/Ignore.html>` annotation.

.. note:: The SDK ignores ``static`` and ``transient`` Fields

   Fields marked ``static`` or ``transient`` are always ignored, and do
   not need the ``@Ignore`` annotation.
