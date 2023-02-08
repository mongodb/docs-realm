auto app = realm::App(INSERT_APP_ID_HERE);

auto user_email = "testUser" + random_string() + "@example.com";
auto user_password = "password1234";

app.register_user(user_email, user_password).get_future().get();
