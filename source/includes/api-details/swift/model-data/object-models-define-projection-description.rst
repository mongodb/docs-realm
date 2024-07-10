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

The examples in this section use a simple data set. The two SDK object
types are ``Person`` and an embedded object ``Address``. A ``Person`` has
a first and last name, an optional ``Address``, and a list of friends
consisting of other ``Person`` objects. An ``Address`` has a city and country.

See the model for these two classes, ``Person`` and ``Address``, below:

.. literalinclude:: /examples/generated/code/start/ClassProjection.snippet.models.swift
   :language: swift
