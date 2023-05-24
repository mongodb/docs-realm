auto thisRealm = realm::open<LoggerDog>();
auto myLogger = std::make_shared<MyCustomLogger>();
realm::set_default_logger(myLogger);
