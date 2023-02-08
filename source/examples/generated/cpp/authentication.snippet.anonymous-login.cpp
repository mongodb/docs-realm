auto app = realm::App(INSERT_APP_ID_HERE);

auto user = app.login(realm::App::credentials::anonymous()).get_future().get();
