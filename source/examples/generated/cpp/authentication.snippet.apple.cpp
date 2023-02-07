auto app = realm::App(INSERT_APP_ID_HERE);

auto idToken = "<token>";

auto user = app.login(realm::App::credentials::apple(idToken)).get_future().get();
