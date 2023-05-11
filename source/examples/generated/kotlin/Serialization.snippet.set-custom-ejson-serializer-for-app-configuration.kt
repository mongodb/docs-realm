AppConfiguration.Builder(FLEXIBLE_APP_ID)
    .ejson(
        EJson(
            serializersModule = SerializersModule {
                contextual(Frogger::class, Frogger.serializer())
            }
        )
    )
    .build()
