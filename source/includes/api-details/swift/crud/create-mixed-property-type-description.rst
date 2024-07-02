When you create an object with an ``AnyRealmValue``, you must specify the
type of the value you store in the property. The SDK provides an 
:swift-sdk:`AnyRealmValue enum <Enums/AnyRealmValue.html>` that iterates
through all of the types the ``AnyRealmValue`` can store.

Later, when you read the mixed property type, you must check the type before
you do anything with the value.
