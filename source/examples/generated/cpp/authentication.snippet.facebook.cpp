auto app = realm::App(APP_ID);

auto accessToken = "<token>";

auto user = app.login(realm::App::credentials::facebook(accessToken)).get_future().get();
