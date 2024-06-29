In Swift, SDK object models are regular Swift classes that define the SDK data
model.

Swift SDK objects must derive from one of the SDK object types.

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

Swift Structs
`````````````

The SDK does not support Swift structs as models for a variety of
reasons. The SDK's design focuses on "live" objects.
This concept is not compatible with value-type structs. By design,
the SDK provides features that are incompatible with these
semantics, such as:

- :ref:`Live data <sdks-live-and-frozen-objects>`
- :ref:`Reactive APIs <sdks-react-to-changes>`
- Low memory footprint of data
- Good operation performance
- :ref:`Lazy and cheap access to partial data <sdks-filter-data-swift>`
- Lack of data serialization/deserialization
- :ref:`Keeping potentially complex object graphs synchronized <sdks-sync-data>`

That said, it is sometimes useful to detach objects from their backing
database. This typically isn't an ideal design decision. Instead,
developers use this as a workaround for temporary limitations in our
library.

You can use key-value coding to initialize an unmanaged object as a copy of
a managed object. Then, you can work with that unmanaged object
like any other :apple:`NSObject <documentation/objectivec/nsobject>`.

.. code-block:: swift

   let standaloneModelObject = MyModel(value: persistedModelObject)
