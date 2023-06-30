realm.write {
    insert(WeatherSensor().apply {
        deviceId = "WX1278UIT"
        temperatureInFarenheit = 6.7F
        barometricPressureInHg = 29.65F
        windSpeedInMph = 2
    })
}
