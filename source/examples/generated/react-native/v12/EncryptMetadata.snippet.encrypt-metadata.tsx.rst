.. code-block:: typescript
   :emphasize-lines: 6-9

   const EncryptMetadata = ({
     encryptionKey,
   }: {
     encryptionKey: ArrayBuffer;
   }) => {
     const metadataConfig = {
       mode: MetadataMode.Encryption,
       encryptionKey: encryptionKey,
     };

     return (
       <AppProvider
         id={APP_ID}
         metadata={metadataConfig}>
         <RestOfApp />
       </AppProvider>
     );
   };
