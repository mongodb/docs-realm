// Initialize the App, authenticate a user, and open the realm
auto app = realm::App(APP_ID);
auto user = app.login(realm::App::credentials::anonymous()).get();
auto syncConfig = user.flexible_sync_configuration();
auto syncedRealm = realm::experimental::db(syncConfig);
