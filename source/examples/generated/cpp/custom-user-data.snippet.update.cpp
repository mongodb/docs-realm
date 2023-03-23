// Functions take an argument of BsonArray, so initialize the custom data as a BsonDocument
auto updatedDataBson = realm::bson::BsonDocument({{"userId", user.identifier()}, { "favoriteColor", "black" }});

// Call an Atlas Function to update custom data for the user
auto updateResult = user.call_function("updateCustomUserData", { updatedDataBson }).get_future().get();

// Refresh the custom user data before reading it to verify it succeeded
user.refresh_custom_user_data().get_future().get();
CHECK((*user.custom_data())["favoriteColor"] == "black");
