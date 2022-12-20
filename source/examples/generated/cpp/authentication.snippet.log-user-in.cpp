auto user = app.login(realm::App::Credentials::username_password(USER_EMAIL, USER_PASSWORD))
    .get_future().get();
