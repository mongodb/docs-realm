auto app = realm::App(APP_ID);
auto user = app.login(realm::App::Credentials::anonymous()).get_future().get();
auto sync_config = user.flexible_sync_configuration();
auto synced_realm_ref = realm::async_open<SyncDog>(sync_config).get_future().get();
auto realm = synced_realm_ref.resolve();
