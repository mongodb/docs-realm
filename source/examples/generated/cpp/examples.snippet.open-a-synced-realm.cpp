auto app = realm::App(APP_ID);
// Ensure anonymous authentication is enabled in the App Services App
auto user = app.login(realm::App::credentials::anonymous()).get_future().get();
auto sync_config = user.flexible_sync_configuration();
// Note that get_future().get() blocks this thread until the promise - 
// in this case, the task kicked off by the call to async_open - is resolved
auto synced_realm_ref = realm::async_open<SyncDog>(sync_config).get_future().get();
// async_open gives us a thread-safe reference to the synced realm, which 
// we need to resolve() before we can safely use the realm on this thread.
auto realm = synced_realm_ref.resolve();
