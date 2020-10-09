let email = "skroob@example.com"
let password = "12345"
app.login(credentials: Credentials.emailPassword(email: email, password: password)) { (user, error) in
  DispatchQueue.main.sync {
      guard error == nil else {
          print("Login failed: \(error!)")
          return
      }
      
      // Now logged in, do something with user
  }
}