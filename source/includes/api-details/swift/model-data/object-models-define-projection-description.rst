Define a class projection by creating a class of type :swift-sdk:`Projection
<Classes/Projection.html>`. Specify the :swift-sdk:`Object <Extensions/Object.html>`
or :swift-sdk:`EmbeddedObject <Extensions/EmbeddedObject.html>` base whose
properties you want to use in the class projection. Use the ``@Projected``
property wrapper to declare a property that you want to project from a
``@Persisted`` property on the base object.

.. note::

   When you use a :ref:`List <sdks-list-property-types>` or a :ref:`Set
   <sdks-set-property-types>` in a class projection, the type in the
   projection should be :swift-sdk:`ProjectedCollection 
   <Structs/ProjectedCollection.html>`.
