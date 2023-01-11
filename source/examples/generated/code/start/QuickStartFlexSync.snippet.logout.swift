do {
    try await user.logOut()
    print("Successfully logged user out")
} catch {
    print("Failed to log user out: \(error.localizedDescription)")
}
