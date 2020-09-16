.. code-block:: json
   
   {
      "name": "<Role Name>",
      "apply_when": <JSON Expression>,
      "insert": <Boolean|JSON Expression>,
      "delete": <Boolean|JSON Expression>,
      "read": <Boolean|JSON Expression>,
      "write": <Boolean|JSON Expression>,
      "search": <Boolean|JSON Expression>,
      "fields": {
         "<Field Name>": {
            "read": <Boolean|JSON Expression>,
            "write": <Boolean|JSON Expression>,
            "fields": <Fields Document>
         },
         ...
      },
      "additional_fields": {
        "read": <Boolean|JSON Expression>,
        "write": <Boolean|JSON Expression>
      },
   }

.. list-table::
   :header-rows: 1
   :widths: 10 30

   * - Field
     - Description

   * - | ``name``
       | String
     - The name of the role. Role names are
       useful for identifying and distinguishing between roles.
       Limited to 100 characters or fewer.

   * - | ``apply_when``
       | Document
     - A :doc:`JSON Expression </services/json-expressions>` that
       evaluates to ``true`` when this role should be applied.

   * - | ``read``
       | Boolean or Document
       | *Default:* ``false``
     - A boolean or :doc:`JSON Expression </services/json-expressions>`
       that evaluates to ``true`` if the role has permission to read all
       fields in the document.
       
       Document-level read permissions take priority over any
       field-level permissions. If a role has a document-level ``read``
       rule, it applies to all fields in the document and cannot be
       overridden. To define specific field-level rules with a default
       fallback, use ``additional_fields`` instead.

   * - | ``write``
       | Boolean or Document
       | *Default:* ``false``
     - A boolean or :doc:`JSON Expression </services/json-expressions>`
       that evaluates to ``true`` if the role has permission to add,
       modify, or remove all fields in the document.

       Document-level write permissions take priority over any
       field-level permissions. If a role has a document-level ``write``
       rule, it applies to all fields in the document and cannot be
       overridden. To define specific field-level rules with a default
       fallback, use ``additional_fields`` instead.
       
       .. admonition:: Implicit Read Permission
          :class: important

          Any time a role has ``write`` permission for a particular
          scope it also has ``read`` permission even if that is not
          explicitly defined.
       
       .. admonition:: MongoDB Expansions
          :class: note
          
          You can use MongoDB expansions, like :json-expansion:`%%root`
          and :json-expansion:`%%prevRoot`, in ``write`` JSON
          expressions.

   * - | ``insert``
       | Boolean or Document
       | *Default:* ``true``
     - A boolean or :doc:`JSON Expression </services/json-expressions>`
       that evaluates to ``true`` if the role has permission to insert a
       new document into the collection.

       .. note::
          
          Document-level ``insert`` permission does *not* imply that a
          role can insert any document. The role must also have
          ``write`` permission for all fields in an inserted document
          for the insert to succeed.

   * - | ``delete``
       | Boolean or Document
       | *Default:* ``true``
     - A boolean or :doc:`JSON Expression </services/json-expressions>`
       that evaluates to ``true`` if the role has permission to delete a
       document from the collection.

   * - | ``search``
       | Boolean or Document
       | *Default:* ``true``
     - A boolean or :doc:`JSON Expression </services/json-expressions>`
       that evaluates to ``true`` if the role has permission to search the
       collection using :atlas:`Atlas Search </atlas-search/>`.
       
       .. include:: /includes/note-atlas-search-rules.rst

   * - | ``fields``
       | Document
       | *Default:* ``{}``
     - A document where the value of each field defines the role's
       field-level ``read`` and ``write`` permissions for the
       corresponding field in a queried document.

       .. code-block:: json

          "fields": {
            "<Field Name>": {
               "read": <Boolean|JSON Expression>,
               "write": <Boolean|JSON Expression>,
               "fields": <Fields Document>
            },
            ...
          }

       .. admonition:: Permission Priority
          
          Document-level ``read`` or ``write`` permissions override all
          field-level permissions of the same type. If permissions are
          defined for a field that contains an embedded document, those
          permissions override any permissions defined for the
          document's embedded fields.

   * - | ``fields.<Field Name>.read``
       | Boolean or Document
       | *Default:* ``false``
     - A boolean or :doc:`JSON Expression </services/json-expressions>`
       that evaluates to ``true`` if the role has permission to read
       the field.

   * - | ``fields.<Field Name>.write``
       | Boolean or Document
       | *Default:* ``false``
     - A boolean or :doc:`JSON Expression </services/json-expressions>`
       that evaluates to ``true`` if the role has permission to add,
       modify, or remove the field.

   * - | ``fields.<Field Name>.fields``
       | Document
       | *Default:* ``{}``
     - A ``fields`` document that defines ``read`` and ``write``
       permissions for fields that are embedded within this field in a
       queried document.

       See the :ref:`Field-level Permissions for Embedded Documents
       <role-template-embedded-documents>` role pattern for more
       information.

   * - | ``additional_fields``
       | Document
       | *Default:* ``{}``
     - A document that defines the role's field-level ``read`` and
       ``write`` permissions for any fields in a queried document that
       don't have explicitly defined permissions.

       .. code-block:: json

          "additional_fields": {
            "read": <Boolean|JSON Expression>,
            "write": <Boolean|JSON Expression>
          }

   * - | ``additional_fields.read``
       | Boolean or Document
       | *Default:* ``false``
     - A boolean or :doc:`JSON Expression </services/json-expressions>`
       that evaluates to ``true`` if the role has permission to read
       any field that does not have a field-level permission definition.

   * - | ``additional_fields.write``
       | Boolean or Document
       | *Default:* ``false``
     - A boolean or :doc:`JSON Expression </services/json-expressions>`
       that evaluates to ``true`` if the role has permission to add,
       modify, or remove any field that does not have a field-level
       permission definition.
