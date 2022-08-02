class Dog: Object {
    @Persisted var name = ""
    @Persisted var age = 0
    @Persisted var color = ""
    @Persisted var currentCity = ""

    // Map of city name -> favorite park in that city
    @Persisted var favoriteParksByCity: Map<String, String>
}
