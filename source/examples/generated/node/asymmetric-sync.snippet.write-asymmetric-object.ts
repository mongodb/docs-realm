realm.write(() => {
  realm.create(WeatherSensor, {
    _id: new BSON.ObjectID(),
    deviceId: "WX1278UIT",
    temperatureInFahrenheit: 66.7,
    barometricPressureInHg: 29.65,
    windSpeedInMph: 2,
  });
});
