.. include:: /includes/dotnet-implement-interface.rst

The following code shows how to define an object model for an ``Item`` object.
In this example, we have marked the ``Id`` field as the Primary Key and marked   
the ``Status`` property as optional. We've also chosen to use the ``MapTo`` 
attribute; properties will be stored in lower case on the server, but can use 
.NET-friendly casing on our property names when using Device Sync.
