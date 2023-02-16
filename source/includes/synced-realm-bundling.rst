.. warning:: Synced Realm Bundling and Client Maximum Offline Time

   If your application has enabled 
   :ref:`client maximum offline time <client-maximum-offline-time>`,
   users could experience a client reset the first time they open the
   bundled realm file. This can happen if the bundled realm file was generated more than **client maximum offline time** days before the user syncs the realm for the first time.

   Users experiencing a client reset download the full state of the
   realm from the application backend. This negates the
   advantages of bundling a realm file. 
   
   To prevent client resets and preserve the advantages of realm 
   file bundling:

   - Avoid using a client maximum offline time in applications that
     bundle a synchronized realm.

   - If your application does use a client maximum offline time, ensure
     that your application download always includes a recently synced
     realm file. Generate a new file each application version,
     and ensure that no version ever stays current for more than
     **client maximum offline time** number of days.