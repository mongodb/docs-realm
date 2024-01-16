// Use the getter method specific to the stored type
val correctType = frogsFavoriteThings[0]?.asInt()

val wrongType = frogsFavoriteThings[0]?.asRealmUUID() // throws exception
assertTrue(thrownException.message!!.contains("RealmAny type mismatch"))
