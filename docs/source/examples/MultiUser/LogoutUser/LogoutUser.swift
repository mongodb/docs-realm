app.currentUser()?.logOut(completion: { (error) in
    guard error == nil else {
        fatalError("Failed to log out user: \(error!.localizedDescription)")
    }
    print("Successfully logged out user")
})
