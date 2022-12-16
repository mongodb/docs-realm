const std::string APP_ID = "cpp-tester-uliix";
const std::string USER_EMAIL = "testUser@mongodb.com";
const std::string USER_PASSWORD = "password1234";

auto app = realm::App(APP_ID);

app.register_user(USER_EMAIL, USER_PASSWORD).get_future().get();
