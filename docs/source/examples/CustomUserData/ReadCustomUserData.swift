let appId = "<YourAppId>" // replace this with your App ID
let app = App(id: appId)
app.login(credentials: Credentials.anonymous()) { (user, error) in
    guard error == nil else {
        print("Failed to log in: \(error!.localizedDescription)")
        return
    }
    guard let user = user else {
        fatalError("User is nil without error")
    }

    // One way to use custom data:
    print("User custom data: \(user.customData)")

    // Another way: refresh in case the user data is stale.
    user.refreshCustomData() { (customData, error) in
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
        print("Favorite color: \(customData["favoriteColor"]!)")
    }
}
