auto user = app.login(realm::App::credentials::username_password(user_email, user_password))
    .get_future().get();
