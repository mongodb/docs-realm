val jimHensonsFrogs = realm.query<ExampleRealmObject_Frog>("owner == $0", "Jim Henson")
// Find the oldest frog owned by Jim Henson
val maxAge = jimHensonsFrogs.max<Int>("age").find()
val oldestFrog = jimHensonsFrogs.query("age == $0", maxAge).find().first()
