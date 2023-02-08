auto app = realm::App(INSERT_APP_ID_HERE);

auto accessToken = "<token>";

auto user = app.login(realm::App::credentials::facebook(accessToken)).get_future().get();
