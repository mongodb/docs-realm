auto app = realm::App(APP_ID);

auto userEmail = "testUser" + random_string() + "@example.com";
auto userPassword = "password1234";

app.register_user(userEmail, userPassword).get_future().get();
