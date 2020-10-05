// Fetch Google token via the Google SDK
let credentials = Credentials.google(serverAuthCode: "<token>")
app.login(credentials: credentials) { (user, error) in
   DispatchQueue.main.sync {
       guard error == nil else {
           print("Login failed: \(error!)")
           return
       }
       
       // Now logged in, do something with user
   }
}