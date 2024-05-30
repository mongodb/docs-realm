.. code-block:: typescript

     // Find projects with an `additionalInfo` property of
     // string type.
     "additionalInfo.@type == 'string'"

     // Find projects with an `additionalInfo` property of
     // `collection` type, which matches list or dictionary types.
     "additionalInfo.@type == 'collection'"

     // Find projects with an `additionalInfo` property of
     // list type, where any list element is of type 'bool'.
     "additionalInfo[*].@type == 'bool'"
