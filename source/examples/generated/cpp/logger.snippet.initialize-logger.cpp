auto logLevel = realm::logger::level::info;
auto thisRealm = realm::open<LoggerDog>();
auto myLogger = MyCustomLogger();
realm::set_default_level_threshold(logLevel);
//realm::set_default_logger(myLogger);
