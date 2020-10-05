let params: Document = ["username": "bob"]

app.login(credentials: Credentials.function(payload: params)) { (user, error) in
   DispatchQueue.main.sync {
       guard error == nil else {
           print("Login failed: \(error!)")
           return
       }
       // Now logged in, do something with user
   }
}