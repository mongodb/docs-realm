auto app = realm::App(APP_ID);
auto user = app.login(realm::App::credentials::anonymous()).get();
auto dbConfig = user.flexible_sync_configuration();

// Setting an error handler on the sync_config gives you access to sync_session and sync_error
dbConfig.sync_config().set_error_handler([](const realm::sync_session& session, const realm::internal::bridge::sync_error& error) {
    std::cerr << "A sync error occurred. Message: " << error.message() << std::endl;
});

auto syncRealm = realm::experimental::db(dbConfig);
