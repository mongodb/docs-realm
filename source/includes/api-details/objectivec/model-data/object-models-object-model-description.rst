In Objective-C, SDK object models are regular Objective-C classes that define
the SDK data model.

Objective-C SDK objects must derive from one of the SDK object types.

Model Inheritance
`````````````````

You can subclass SDK models to share behavior between
classes, but there are limitations. In particular, the SDK
does not allow you to:

- Cast between polymorphic classes: subclass to subclass, subclass to parent, parent to subclass
- Query on multiple classes simultaneously: for example, "get all instances of parent class and subclass"
- Multi-class containers: ``List`` and ``Results`` with a mixture of parent and subclass

.. tip::

   Check out the :github:`code samples
   <realm/realm-swift/issues/1109#issuecomment-143834756>` for working
   around these limitations.
