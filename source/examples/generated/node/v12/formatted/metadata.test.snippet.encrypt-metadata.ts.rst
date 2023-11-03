.. code-block:: typescript

   // Retrieve encryption key from secure location or create one
   const encryptionKey = new ArrayBuffer(64);

   // Use encryption key in app configuration
   const config: AppConfiguration = {
     id: APP_ID,
     metadata: { mode: MetadataMode.Encryption, encryptionKey },
   };
   const app = new Realm.App(config);
