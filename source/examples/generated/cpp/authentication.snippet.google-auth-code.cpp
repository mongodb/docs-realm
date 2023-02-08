auto app = realm::App(INSERT_APP_ID_HERE);

// The auth_code below is the user's server auth code you got from Google
auto user = app.login(realm::App::credentials::google(auth_code)).get_future().get();
