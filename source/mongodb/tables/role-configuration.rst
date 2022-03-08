.. code-block:: json
   
   {
      "name": "<Role Name>",
      "apply_when": { Expression },
      "insert": { Expression },
      "delete": { Expression },
      "read": { Expression },
      "write": { Expression },
      "search": { Expression },
      "fields": {
         "<Field Name>": {
            "read": { Expression },
            "write": { Expression },
            "fields": { Embedded Fields }
         },
         ...
      },
      "additional_fields": {
        "read": { Expression },
        "write": { Expression }
      },
   }

.. list-table::
   :header-rows: 1
   :widths: 10 30

   * - Field
     - Description

   * - | ``name``
       | string
     - The name of the role. Role names identify and distinguish between
       roles in the same collection. Limited to 100 characters or fewer.

   * - | ``apply_when``
       | Expression
     - An :ref:`expression <expressions>` that evaluates to ``true`` when
       this role applies to a user for a specific document.

   * - | ``read``
       | Expression
       | *Default:* ``false``
     - An :ref:`expression <expressions>` that evaluates to ``true`` if the
       role has permission to read all fields in the document.
       
       Document-level read permissions take priority over any field-level
       permissions. If a role has document-level ``read`` permissions, it
       applies to all fields in the document and cannot be overridden.
       
       To define a default fallback alongside field-level rules, use
       ``additional_fields`` instead.

   * - | ``write``
       | Expression
       | *Default:* ``false``
     - An :ref:`expression <expressions>` that evaluates to ``true`` if the
       role has permission to add, modify, or remove all fields in the document.

       Document-level write permissions take priority over any field-level
       permissions. If a role has document-level ``write`` permissions, it
       applies to all fields in the document and cannot be overridden.
       
       To define a default fallback alongside field-level rules, use
       ``additional_fields`` instead.
       
       .. important:: Implicit Read Permission

          Any time a role has ``write`` permission for a particular
          scope it also has ``read`` permission even if that is not
          explicitly defined.
       
       .. note:: MongoDB Expansions
          
          You can use MongoDB expansions, like :json-expansion:`%%root`
          and :json-expansion:`%%prevRoot`, in ``write`` JSON
          expressions.

   * - | ``insert``
       | Expression
       | *Default:* ``true``
     - An :ref:`expression <expressions>` that evaluates to
       ``true`` if the role has permission to insert a new document into the
       collection.

       .. note::
          
          Document-level ``insert`` permission does *not* imply that a
          role can insert any document. The role must also have
          ``write`` permission for all fields in an inserted document
          for the insert to succeed.

   * - | ``delete``
       | Expression
       | *Default:* ``true``
     - An :ref:`expression <expressions>` that evaluates to ``true`` if the
       role has permission to delete a document from the collection.

   * - | ``search``
       | Expression
       | *Default:* ``true``
     - An :ref:`expression <expressions>` that evaluates to ``true`` if the
       role has permission to search the collection using :atlas:`Atlas Search
       </atlas-search/>`.
       
       .. include:: /includes/note-atlas-search-rules.rst

   * - | ``fields``
       | Document
       | *Default:* ``{}``
     - A document where the value of each field defines the role's field-level
       ``read`` and ``write`` permissions for the corresponding field in a
       queried document.

       .. code-block:: json

          "fields": {
            "<Field Name>": {
               "read": { Expression },
               "write": { Expression },
               "fields": <Fields Document>
            },
            ...
          }

       .. note:: Permission Priority
          
          Document-level ``read`` or ``write`` permissions override all
          field-level permissions of the same type. If permissions are
          defined for a field that contains an embedded document, those
          permissions override any permissions defined for the
          document's embedded fields.

   * - | ``fields.<Field Name>.read``
       | Expression
       | *Default:* ``false``
     - An :ref:`expression <expressions>` that evaluates to ``true`` if the
       role has permission to read the field.

   * - | ``fields.<Field Name>.write``
       | Expression
       | *Default:* ``false``
     - An :ref:`expression <expressions>` that evaluates to ``true`` if the
       role has permission to add, modify, or remove the field.

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
            "read": { Expression },
            "write": { Expression }
          }

   * - | ``additional_fields.read``
       | Expression
       | *Default:* ``false``
     - An :ref:`expression <expressions>` that evaluates to ``true`` if the
       role has permission to read any field that does not have a field-level
       permission definition.

   * - | ``additional_fields.write``
       | Expression
       | *Default:* ``false``
     - An :ref:`expression <expressions>` that evaluates to ``true`` if the
       role has permission to add, modify, or remove any field that does not
       have a field-level permission definition.
