Java and Kotlin (Java SDK) do not provide a dedicated API to find an object by
primary key. To find an object with a specific primary key value, query the
primary key field for the desired primary key value using the
:java-sdk:`RealmQuery.equalTo()
<io/realm/RealmQuery.html#equalTo-java.lang.String-Decimal128->` method.
