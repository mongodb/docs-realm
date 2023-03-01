class Horse : RealmObject {
    val _id: ObjectId = ObjectId()
    val name: String =""
    @PersistedName("rider_name") // Name persisted to realm
    val riderName: Knight? = null // Kotlin name used in code
}
