auto weatherSensorReading = WeatherSensorReading {
    .deviceId = "WX1278UIT",
    .temperatureInFahrenheit = 64.7,
    .windSpeedInMph = 7
};

asymmetricRealm.write([&asymmetricRealm, &weatherSensorReading] {
    asymmetricRealm.add(weatherSensorReading);
});
