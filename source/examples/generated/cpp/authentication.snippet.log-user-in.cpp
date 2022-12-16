std::promise<realm::User> app_user;

app.login(realm::App::Credentials::username_password(USER_EMAIL, USER_PASSWORD), [&](auto realm_user, auto err){
    app_user.set_value(realm_user);
});

auto user = app_user.get_future().get();
