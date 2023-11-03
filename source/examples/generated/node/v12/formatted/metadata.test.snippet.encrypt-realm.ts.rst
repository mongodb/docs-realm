.. code-block:: typescript

   // Retrieve encryption key from secure location or create one
   const encryptionKey = new ArrayBuffer(64);

   // Use encryption key in realm configuration
   const config: Configuration = {
     schema: [Task],
     encryptionKey: encryptionKey,
   };

   const realm = await Realm.open(config);
