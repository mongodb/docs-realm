let anonymousCredentials = Credentials.anonymous
app.login(credentials: anonymousCredentials) { (user, error) in
  DispatchQueue.main.sync {
      guard error == nil else {
          print("Login failed: \(error!)")
          return
      }
      
      // Now logged in, do something with user
  }
}