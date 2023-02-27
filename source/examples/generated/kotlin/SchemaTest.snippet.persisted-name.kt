class Horse : RealmObject {
    val _id: ObjectId = ObjectId()
    val name: String =""
    @PersistedName("rider_name")
    val riderName: Knight? = null
}
