You can insert objects into the database from JSON. The SDK
supports creating objects from ``String``,
:android:`JSONObject <reference/org/json/JSONObject.html>`, and
:android:`InputStream <reference/java/io/InputStream.html>` types.
The SDK ignores any properties present in the JSON that are
not defined in the SDK object schema.

The following example demonstrates how to create a single object from JSON with 
:java-sdk:`createObjectFromJson() <io/realm/Realm.html#createObjectFromJson-java.lang.Class-java.lang.String->`
or multiple objects from JSON with
:java-sdk:`createAllFromJson() <io/realm/Realm.html#createAllFromJson-java.lang.Class-java.lang.String->`:
