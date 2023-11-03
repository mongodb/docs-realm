.. code-block:: javascript

   // Retrieve encryption key from secure location or create one
   const encryptionKey = new ArrayBuffer(64);

   // Use encryption key in app configuration
   const config = {
     id: APP_ID,
     metadata: { mode: MetadataMode.Encryption, encryptionKey },
   };
   const app = new Realm.App(config);
