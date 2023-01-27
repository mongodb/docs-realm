auto app = realm::App(INSERT_APP_ID_HERE);

std::string user_email = "testUser@mongodb.com";
std::string user_password = "password1234";

app.register_user(user_email, user_password).get_future().get();
