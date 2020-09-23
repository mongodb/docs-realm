let app = App(id: "myapp-abcde")

let joeCredentials = Credentials(email: "joe@example.com", password: "passw0rd")
app.login(credentials: joeCredentials) { (joe, error) in
  DispatchQueue.main.sync {
    guard error == nil else {
      print("Login failed: \(error!)")
      return
    }
    
    // The active user is now Joe
    assert(joe == app.currentUser())
  }
}

let emmaCredentials = Credentials(email: "emma@example.com", password: "pa55word")
app.login(credentials: emmaCredentials) { (emma, error) in
  DispatchQueue.main.sync {
    guard error == nil else {
      print("Login failed: \(error!)")
      return
    }
    
    // The active user is now Emma
    assert(emma == app.currentUser())
  }
}