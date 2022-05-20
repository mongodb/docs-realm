class Movie: RealmObject {
    @Index
    val _id: Long = Random.nextLong()
    val starring: List<String> = listOf()
}
