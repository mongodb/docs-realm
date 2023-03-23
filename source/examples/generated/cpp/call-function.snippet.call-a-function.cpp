// Connect to an App Services App and authenticate a user
auto app = realm::App(APP_ID);
auto user = app.login(realm::App::credentials::anonymous()).get_future().get();
auto sync_config = user.flexible_sync_configuration();

// If a function takes arguments, pass them as BSON
auto arg1 = realm::bson::Bson("john.smith");
auto arg2 = realm::bson::Bson("@companyemail.com");

// Call an App Services function as the logged-in user
auto result = user.call_function("concatenate", { arg1, arg2 }).get_future().get();

// Verify that the result has a value
CHECK(result);
auto bsonResult = result.value();

// Translate the BSON result back to a string
auto resultString = std::string(bsonResult);
// Prints "Calling the concatenate function returned john.smith@companyemail.com."
std::cout << "Calling the concatenate function returned " << resultString << ".\n";
