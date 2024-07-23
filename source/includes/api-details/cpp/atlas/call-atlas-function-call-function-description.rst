To call an Atlas Function, use the 
:cpp-sdk:`call_function() <structrealm_1_1user.html#a82ab02822dd96e8d44201b996dd6ed0c>` 
member function on the ``user`` object. Pass in the name of the 
function as a string for the first parameter. This function takes two arguments,
which we provide as a string array of arguments.

The callback can provide an optional string result, or an optional error.
In this example, we check that the result has a value.
