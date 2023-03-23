auto app = realm::App(APP_ID);

auto user = app.login(realm::App::credentials::api_key(API_KEY)).get_future().get();
