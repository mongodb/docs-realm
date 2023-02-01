.. important:: Inheritance

   All Realm objects inherit from the 
   :dotnet-sdk:`IRealmObject <reference/Realms.IRealmObject.html>`, 
   :dotnet-sdk:`IEmbeddedObject <reference/Realms.IEmbeddedObject.html>`, or 
   :dotnet-sdk:`IAsymmetricObject <reference/Realms.IAsymmetricObject.html>`
   interface and should be declared ``partial`` classes.

   You can also derive from the 
   :dotnet-sdk:`RealmObject <reference/Realms.RealmObject.html>`, 
   :dotnet-sdk:`EmbeddedObject <reference/Realms.EmbeddedObject.html>`, or 
   :dotnet-sdk:`AsymmetricObject <reference/Realms.AsymmetricObject.html>`
   base classes. However, in the future we may deprecate the 
   base classes. You should use the interfaces for any new classes
   that you write.