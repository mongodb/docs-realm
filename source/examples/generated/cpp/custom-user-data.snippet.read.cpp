// Custom user data could be stale, so refresh it before reading it
user.refresh_custom_user_data().get();
CHECK((*user.custom_data())["favoriteColor"] == "gold");
