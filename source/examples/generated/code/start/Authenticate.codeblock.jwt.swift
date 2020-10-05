let credentials = Credentials.jwt(token: "<jwt>")
app.login(credentials: credentials) { (user, error) in
   DispatchQueue.main.sync {
       guard error == nil else {
           print("Login failed: \(error!)")
           return
       }
       
       // Now logged in, do something with user
   }
}