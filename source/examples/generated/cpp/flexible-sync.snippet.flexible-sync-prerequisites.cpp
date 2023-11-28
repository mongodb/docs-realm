// Initialize the App, authenticate a user, and open the realm
auto appConfig = realm::App::configuration();
appConfig.app_id = APP_ID;
auto app = realm::App(appConfig);
auto user = app.login(realm::App::credentials::anonymous()).get();
auto syncConfig = user.flexible_sync_configuration();
auto syncedRealmRef = realm::async_open<Dog>(syncConfig).get_future().get();
auto syncedRealm = syncedRealmRef.resolve();
