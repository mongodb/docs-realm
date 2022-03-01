class Student : RealmObject() {
    @Required
    var notes = RealmList<String>()
    var nullableNotes = RealmList<String>()
}
