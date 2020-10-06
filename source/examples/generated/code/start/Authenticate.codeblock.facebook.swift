// Fetch Facebook token via the Facebook SDK
let credentials = Credentials.facebook(accessToken: "<token>")
app.login(credentials: credentials) { (user, error) in
   DispatchQueue.main.sync {
       guard error == nil else {
           print("Login failed: \(error!)")
           return
       }
       
       // Now logged in, do something with user
   }
}