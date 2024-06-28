In C#, you can define object schemas by using the C# class declarations. 
When a database is initialized, it discovers the SDK objects defined in all
assemblies that have been loaded and generates schemas accordingly. If you
want to restrict a database to manage only a subset of the SDK models in the
loaded assemblies, you *can* explicitly pass the models when configuring a
database.

For more information, refer to :ref:`sdks-provide-a-subset-of-classes-to-a-database`.

.. note:: 

   .NET does not load an assembly until you reference a class in it. If you 
   define your object models in one assembly and instantiate a database 
   in another, be sure to call a method in the assembly that contains the object 
   models *before* initialization. Otherwise, the SDK does not discover 
   the objects when it first loads. 
