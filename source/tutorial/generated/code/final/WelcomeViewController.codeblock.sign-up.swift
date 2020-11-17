@objc func signUp() {
    setLoading(true);
    app.emailPasswordAuth.registerUser(email: email!, password: password!, completion: { [weak self](error) in
        // Completion handlers are not necessarily called on the UI thread.
        // This call to DispatchQueue.main.async ensures that any changes to the UI,
        // namely disabling the loading indicator and navigating to the next page,
        // are handled on the UI thread:
        DispatchQueue.main.async {
            self!.setLoading(false);
            guard error == nil else {
                print("Signup failed: \(error!)")
                self!.errorLabel.text = "Signup failed: \(error!.localizedDescription)"
                return
            }
            print("Signup successful!")

            // Registering just registers. Now we need to sign in, but we can reuse the existing email and password.
            self!.errorLabel.text = "Signup successful! Signing in..."
            self!.signIn()
        }
    })
}