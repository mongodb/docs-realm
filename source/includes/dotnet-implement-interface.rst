.. important:: Inheritance

   All SDK objects inherit from the 
   :dotnet-sdk:`IRealmObject <reference/Realms.IRealmObject.html>`, 
   :dotnet-sdk:`IEmbeddedObject <reference/Realms.IEmbeddedObject.html>`, or 
   :dotnet-sdk:`IAsymmetricObject <reference/Realms.IAsymmetricObject.html>`
   interface and must be declared ``partial`` classes.

   In versions of the .NET SDK v10.18.0 and earlier, objects derive from 
   :dotnet-sdk:`RealmObject <reference/Realms.RealmObject.html>`, 
   :dotnet-sdk:`EmbeddedObject <reference/Realms.EmbeddedObject.html>`, or 
   :dotnet-sdk:`AsymmetricObject <reference/Realms.AsymmetricObject.html>`
   base classes. This approach to SDK model definition is still supported, but 
   does not include new features such as the :ref:`nullability annotations 
   <sdks-required-optional-property>`. These base classes will be 
   deprecated in a future SDK release. You should use the interfaces for any 
   new classes that you write and should consider migrating your existing 
   classes.