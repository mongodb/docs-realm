std::string path = std::filesystem::current_path();
realm::db_config config = { path = path };
auto realm = realm::open<Person, Dog>(config);
