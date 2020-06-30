let app = RealmApp(id: "myapp-abcde")

let joeCredentials = AppCredentials.emailPassword("joe@example.com", "passw0rd")
app.login(withCredential: joeCredentials) { (joe, error) in
  DispatchQueue.main.sync {
    guard error == nil else {
      print("Login failed: \(error!)")
      return
    }
    
    // The active user is now Joe
    assert(joe == app.currentUser())
  }
}

let emmaCredentials = AppCredentials.emailPassword("emma@example.com", "pa55word")
app.login(withCredential: emmaCredentials) { (emma, error) in
  DispatchQueue.main.sync {
    guard error == nil else {
      print("Login failed: \(error!)")
      return
    }
    
    // The active user is now Emma
    assert(emma == app.currentUser())
  }
}
