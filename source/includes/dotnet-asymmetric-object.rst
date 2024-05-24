When defining an asymmetric object in C#:

- The C# objects that you sync with Atlas must implement the 
  :dotnet-sdk:`IAsymmetricObject <reference/Realms.IAsymmetricObject.html>`
  interface or derive from the 
  :dotnet-sdk:`AsymmetricObject <reference/Realms.AsymmetricObject.html>` class.

- Starting in .NET SDK version 11.6.0 and later, an object that implements 
  ``IAsymmetricObject`` can contain
  :dotnet-sdk:`IEmbeddedObject <reference/Realms.IEmbeddedObject.html>` types, 
  and links to ``IRealmObject`` types. In .NET SDK versions 11.5.0 and earlier, 
  an object that implements ``IAsymmetricObject`` can only contain
  :dotnet-sdk:`IEmbeddedObject <reference/Realms.IEmbeddedObject.html>` types - 
  it does not support links to ``IRealmObject`` types or other 
  ``IAsymmetricObject`` types. 

- ``IRealmObject`` and ``IEmbeddedObject`` types cannot contain ``IAsymmetricObject``
  types as properties. 
