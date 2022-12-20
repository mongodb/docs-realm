const std::string APP_ID = "cpp-tester-uliix";

auto app = realm::App(APP_ID);

std::string USER_EMAIL = "testUser@mongodb.com";
std::string USER_PASSWORD = "password1234";

app.register_user(USER_EMAIL, USER_PASSWORD).get_future().get();
