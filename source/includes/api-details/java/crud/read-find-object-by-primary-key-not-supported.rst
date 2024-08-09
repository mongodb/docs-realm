Java and Kotlin (Java SDK) do not provide a dedicated API to find an object by
primary key. Instead, you can perform a regular query for objects where the
primary key property matches the desired primary key value using the
:java-sdk:`RealmQuery.equalTo()
<io/realm/RealmQuery.html#equalTo-java.lang.String-Decimal128->` method.
