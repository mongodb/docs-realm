Snippet Setup
~~~~~~~~~~~~~

.. tabs-realm-sdks::

   tabs:
     - id: functions
       content: |
         To use a code snippet in a :doc:`function </functions>`, you
         must first instantiate a MongoDB collection handle:

         .. code-block:: javascript
            :emphasize-lines: 3

            exports = function() {
              const mongodb = context.services.get("mongodb-atlas");
              const itemsCollection = mongodb.db("store").collection("items");
              const purchasesCollection = mongodb.db("store").collection("purchases");
            }
     - id: javascript
       content: |
         To use a code snippet in a JavaScript project, you must first
         do the following:

         .. include:: /includes/steps/crud-snippets-js.rst
     - id: android
       content: |
         To use a code snippet in an Android project, you must first do
         the following:

         .. include:: /includes/steps/crud-snippets-android.rst
     - id: ios
       content: |
         To use a code snippet in an iOS project, you must first do
         the following:

         .. include:: /includes/steps/crud-snippets-ios.rst
