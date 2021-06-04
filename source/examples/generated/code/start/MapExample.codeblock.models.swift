class Dog: Object {
    @objc dynamic var name = ""
    @objc dynamic var currentCity = ""

    // Map of city name -> favorite park in that city
    let favoriteParksByCity = Map<String, String>()
}
