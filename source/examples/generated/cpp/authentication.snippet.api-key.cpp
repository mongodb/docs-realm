auto app = realm::App(INSERT_APP_ID_HERE);

auto user = app.login(realm::App::credentials::api_key(API_KEY)).get_future().get();
