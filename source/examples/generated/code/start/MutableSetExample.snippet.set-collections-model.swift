class Dog: Object {
    @Persisted var name = ""
    @Persisted var currentCity = ""
    @Persisted var citiesVisited: MutableSet<String>
}
