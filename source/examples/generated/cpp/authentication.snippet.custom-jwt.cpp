auto token = "<jwt>";

auto app = realm::App(INSERT_APP_ID_HERE);

auto user = app.login(realm::App::credentials::custom(token)).get_future().get();
