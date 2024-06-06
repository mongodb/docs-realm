To define the inverse relationship, define a getter-only ``IQueryable<T>``
property in your object model, where ``T`` is the source type of the
relationship. Then, annotate this property with a 
:dotnet-sdk:`[Backlink(sourceProperty)] <reference/Realms.BacklinkAttribute.html>` 
attribute, where "sourceProperty" is the name of the property on the other 
side of the relationship. The following example shows how to do this with the 
"User has many Items" scenario.

In this example, note that:

- The Item object's ``Assignee`` property is a ``User`` object.

- The ``User`` object's ``Items`` property inverts the relationship and 
  refers to all ``Item`` objects that contain this specific ``User`` in their 
  ``Assignee`` property. 

This, then, allows us to query the ``Item`` collection to get all ``Items``
assigned to a specific ``User``.
