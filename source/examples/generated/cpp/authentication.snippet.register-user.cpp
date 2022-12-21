const std::string APP_ID = "cpp-tester-uliix";

auto app = realm::App(APP_ID);

std::string user_email = "testUser@mongodb.com";
std::string user_password = "password1234";

app.register_user(user_email, user_password).get_future().get();
