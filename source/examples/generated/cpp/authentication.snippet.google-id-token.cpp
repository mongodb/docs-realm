auto app = realm::App(INSERT_APP_ID_HERE);

// The id_token below is the user's OpenID Connect id_token you got from the Google OAuth response
auto user = app.login(realm::App::credentials::google(id_token)).get_future().get();
