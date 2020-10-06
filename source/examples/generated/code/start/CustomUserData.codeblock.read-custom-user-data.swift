let appId = YOUR_REALM_APP_ID // replace this with your App ID
let app = App(id: appId)
app.login(credentials: Credentials.anonymous) { (user, error) in
    guard error == nil else {
        print("Failed to log in: \(error!.localizedDescription)")
        return
    }

    // If the user data has been refreshed recently, you can access the
    // custom user data directly on the user object
    print("User custom data: \(user!.customData)")

    // Refresh the custom user data
    user!.refreshCustomData() { (customData, error) in
        guard error == nil else {
            print("Failed to refresh custom data: \(error!.localizedDescription)")
            return
        } 
        guard let customData = customData else {
            // This may happen if no custom data was set for the user id.
            // It could also be caused by not having custom data enabled and
            // configured correctly!
            print("Custom data not set")
            return
        }
        // favoriteColor was set on the custom data.
        print("Favorite color: \(customData["favoriteColor"] ?? "not set")")
    }
}