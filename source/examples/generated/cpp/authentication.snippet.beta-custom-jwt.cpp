auto token = "<jwt>";

auto app = realm::App(APP_ID);

auto user = app.login(realm::App::credentials::custom(token)).get();
