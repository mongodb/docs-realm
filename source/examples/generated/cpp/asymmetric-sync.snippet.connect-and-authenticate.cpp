auto app = realm::App(APP_ID);
auto user = app.login(realm::App::credentials::anonymous()).get_future().get();
