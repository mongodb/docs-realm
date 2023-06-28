val config = SyncConfiguration.create(user, setOf(WeatherSensor::class))
val asymmetricRealm = Realm.open(config)
Log.v("Successfully opened realm: ${asymmetricRealm.configuration.name}")
