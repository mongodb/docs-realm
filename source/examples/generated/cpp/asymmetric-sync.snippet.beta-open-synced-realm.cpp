auto app = realm::App(APP_ID);
// Ensure anonymous authentication is enabled in the App Services App
auto user = app.login(realm::App::credentials::anonymous()).get();
auto syncConfig = user.flexible_sync_configuration();
auto realm = db(syncConfig);
