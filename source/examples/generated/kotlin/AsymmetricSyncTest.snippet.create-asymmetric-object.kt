// Open a write transaction
realm.write {
    // Create a new asymmetric object
    val weatherSensor = WeatherSensor().apply {
        deviceId = "WX1278UIT"
        temperatureInFarenheit = 6.7F
        barometricPressureInHg = 29.65F
        windSpeedInMph = 2
    }
    // Insert the object into the realm with the insert() extension method
    insert(weatherSensor)

// The object is inserted into the realm, then syncs to the
// App Services backend. You CANNOT access the managed
// data locally.

}
