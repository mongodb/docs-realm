auto weatherSensorReading = realm::experimental::WeatherSensorReading {
    .deviceId = "WX1278UIT",
    .temperatureInFahrenheit = 64.7,
    .windSpeedInMph = 7
};

asymmetricRealm.write([&]{
    asymmetricRealm.add(std::move(weatherSensorReading));
});
