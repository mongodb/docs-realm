.. code-block:: swift

  // import StitchCore

  func linkWithNewUsernamePassword(username: String, password: String) {
      // Get the Stitch client and auth.
      let client = Stitch.defaultAppClient!
      let auth = client.auth
      
      // In this example, we are assuming that there
      // is a currently logged-in anonymous user.
      let user = auth.currentUser!
      
      // Create a new username and password credential,
      // which we will link with the anonymous user.
      let credential = UserPasswordCredential.init(
          withUsername: username,
          withPassword: password
      )
      
      // Link the current anonymous user with the new user credential.
      // The completionHandler is passed as a second argument.
      user.link(withCredential: credential, {(user: StitchResult<StitchUser>) in 
          // completionHandler: User is now linked
      }) 
  }
