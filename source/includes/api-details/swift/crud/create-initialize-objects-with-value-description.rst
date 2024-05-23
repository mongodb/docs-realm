You can initialize an object by passing an initializer value to
:swift-sdk:`Object.init(value:)
<Extensions/Object.html#/s:So16RealmSwiftObjectC0aB0E5valueAByp_tcfc>`.
The initializer value can be a :apple:`key-value coding
<library/archive/documentation/Cocoa/Conceptual/KeyValueCoding/>`
compliant object, a dictionary, or an array containing one element for
each managed property.

.. note::

   When using an array as an initializer value, you must include all
   properties in the same order as they are defined in the model.
