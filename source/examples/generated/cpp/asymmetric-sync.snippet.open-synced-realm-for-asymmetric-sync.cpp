auto syncConfig = user.flexible_sync_configuration();
auto asymmetricRealm = realm::async_open<WeatherSensorReading>(syncConfig).get_future().get().resolve();
