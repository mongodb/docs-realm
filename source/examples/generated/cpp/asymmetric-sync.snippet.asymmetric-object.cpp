struct WeatherSensorReading : realm::asymmetric_object<WeatherSensorReading> { 
    realm::persisted<realm::object_id> _id{realm::object_id::generate()};
    realm::persisted<std::string> deviceId;
    realm::persisted<double> temperatureInFahrenheit;
    realm::persisted<int64_t> windSpeedInMph;

    static constexpr auto schema = realm::schema("WeatherSensorReading",
        realm::property<&WeatherSensorReading::_id, true>("_id"),
        realm::property<&WeatherSensorReading::deviceId>("deviceId"),
        realm::property<&WeatherSensorReading::temperatureInFahrenheit>("temperatureInFahrenheit"),
        realm::property<&WeatherSensorReading::windSpeedInMph>("windSpeedInMph"));
};
