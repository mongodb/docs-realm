In C#, value types, such as ``int`` and ``bool``, are implicitly non-nullable.
However, they can be made optional by using the question mark (``?``) `notation
<https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-value-types>`__.

Beginning with C# 8.0, nullable reference types were introduced. If your project
is using C# 8.0 or later, you can also declare reference types, such as ``string``
and ``byte[]``, as nullable with ``?``.

.. note::

   Beginning with .NET 6.0, the nullable context is enabled by default for new
   projects. For older projects, you can manually enable it. For more information,
   refer to `<https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/nullable-reference-types#setting-the-nullable-context>`__.

The SDK fully supports the nullable-aware context and uses nullability
to determine whether a property is required or optional.

Alternatives to the Nullable-Aware Context
``````````````````````````````````````````

If you are using the older schema type definition (your classes derive from
the ``RealmObject`` base class), or you do not have nullability enabled, you
must use the :dotnet-sdk:`[Required] <reference/Realms.RequiredAttribute.html>`
attribute for any required ``string`` and ``byte[]`` property.

You may prefer to have more flexibility in defining the nullability of properties
in your SDK objects. You can do so by setting ``realm.ignore_objects_nullability = true``
in a `global configuration file <https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/configuration-files>`__.

If you enable ``realm.ignore_objects_nullability``, the SDK ignores nullability
annotations on object properties, including collections of SDK objects.
