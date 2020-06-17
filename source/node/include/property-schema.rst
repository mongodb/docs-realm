A **property schema** is a field-level configuration that defines and
constrains a specific property in an object schema. Every object schema
must include a property schema for each property in the object. At
minimum, a property schema defines a property's data type and indicates
whether or not the property is required.

You can configure the following constraints for a given property:

.. list-table::
   :header-rows: 1
   :widths: 20 80
   
   * - Parameter
     - Description

   * - Type
     - Every property in a {+service-short+} object has a strongly defined data
       type. A property's type can be a primitive data type or an object
       type defined in the same {+realm+}. The type also specifies whether
       the property contains a single value or a list of values.
       
       {+client-database+} supports the following primitive data types:

       - ``bool`` for boolean values
       - ``int``, ``float``, and ``double``, which map to JavaScript ``number`` values
       - ``string``
       - ``date``, which maps to :mdn:`Date <Web/JavaScript/Reference/Global_Objects/Date>`
       - ``data``, which maps to :mdn:`ArrayBuffer <Web/JavaScript/Reference/Global_Objects/ArrayBuffer>`
       - ``objectId``, which maps to :manual:`ObjectId </reference/method/ObjectId/>`

   * - Optional
     - Optional properties may contain a null value or be entirely
       omitted from an object. By default, all properties are required
       unless explicitly marked as optional. To mark a property as
       optional, append a question mark (``?``) to its name.

       .. example::
      
          The following schema defines an optional string property, ``breed``:

          .. literalinclude:: /examples/Schemas/DogSchema.js
             :language: javascript
             :emphasize-lines: 6

   * - Default
     - If a client application creates a new object that does not have a
       value for a defined property, the object uses the default value
       instead.

       You can specify a default value on a property by using the
       object-form property specification. For example, the following
       schema defines a Car with a default value of 0 for its ``miles``
       property:

       .. code-block:: javascript
          :emphasize-lines: 6
          
          const CarSchema = {
            name: 'Car',
            properties: {
              make:  'string',
              model: 'string',
              miles: {type: 'int', default: 0},
            }
          };

   * - Indexed
     - A property index significantly increases the speed of certain
       read operations at the cost of additional overhead for write
       operations. Indexes are particularly useful for equality
       comparison, such as querying for an object based on the value of
       a property.

       To enable an index on a given property, set ``indexed`` to
       ``true`` in the long-form property specification. The following
       example defined a BookSchema with an index on the ``name``
       property:

       .. code-block:: javascript
          :emphasize-lines: 4

          const BookSchema = {
          name: 'Book',
            properties: {
              name: { type: 'string', indexed: true },
              price: 'float'
            }
          };
