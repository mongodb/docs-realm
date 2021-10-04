.. _dotnet-manual-schema:

===========================================
Programmatically Define a Scheme - .NET SDK
===========================================

.. default-domain:: mongodb

.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 2
   :class: singlecol

When {+realm+} processes C# classes that inherit from
:dotnet-sdk:`RealmObject <reference/Realms.RealmObject.html>` or 
:dotnet-sdk:`EmbeddedObject <reference/Realms.EmbeddedObject.html>` 
(in other words, :term:`{+service-short+} objects <Realm object>`), it 
generates schemas based on the defined properties in the class. There may 
be times that you want to programmatically define the schema, and the 
.NET SDK provides a mechanism for doing so. 

Use the Schema Property
-----------------------
You use the 
:dotnet-sdk:`Schema <reference/Realms.RealmConfigurationBase.html#Realms_RealmConfigurationBase_Schema>` 
property of the 
:dotnet-sdk:`RealmConfigurationBase <reference/Realms.RealmConfigurationBase.html>` 
object to control how schemas are defined. The following code example shows three 
ways to do this, from easiest to most complex: automatic configuration, manual 
configuration, and a mix of both methods.

.. literalinclude:: /examples/generated/dotnet/Schemas.codeblock.schema_property.cs
   :language: csharp

