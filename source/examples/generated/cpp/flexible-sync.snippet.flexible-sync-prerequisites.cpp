// Initialize the App, authenticate a user, and open the realm
auto app = realm::App(APP_ID);
auto user = app.login(realm::App::credentials::anonymous()).get_future().get();
auto syncConfig = user.flexible_sync_configuration();
auto syncedRealmRef = realm::async_open<Dog>(syncConfig).get_future().get();
auto syncedRealm = syncedRealmRef.resolve();
