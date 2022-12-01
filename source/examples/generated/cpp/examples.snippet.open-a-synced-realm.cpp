auto app = realm::App(APP_ID);
auto user = app.login(realm::App::Credentials::anonymous());
auto sync_config = user.flexible_sync_configuration();
auto synced_realm_ref = realm::async_open<Dog>(sync_config);
auto realm = synced_realm_ref.resolve();
