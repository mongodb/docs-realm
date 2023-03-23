auto app = realm::App(APP_ID);

auto idToken = "<token>";

auto user = app.login(realm::App::credentials::apple(idToken)).get_future().get();
