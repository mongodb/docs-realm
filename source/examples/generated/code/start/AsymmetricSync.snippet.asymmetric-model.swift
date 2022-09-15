class WeatherSensor: AsymmetricObject {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var deviceId: String
    @Persisted var temperatureInFahrenheit: Float
    @Persisted var barometricPressureInHg: Float
    @Persisted var windSpeedInMph: Int

    convenience init(deviceId: String, temperatureInFahrenheit: Float, barometricPressureInHg: Float, windSpeedInMph: Int) {
        self.init()
        self.deviceId = deviceId
        self.temperatureInFahrenheit = temperatureInFahrenheit
        self.barometricPressureInHg = barometricPressureInHg
        self.windSpeedInMph = windSpeedInMph
    }
}
