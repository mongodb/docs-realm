// Fetch Apple token via the Apple SDK
let credentials = Credentials(appleToken: "<token>")
app.login(credentials: credentials) { (user, error) in
   DispatchQueue.main.sync {
       guard error == nil else {
           print("Login failed: \(error!)")
           return
       }
       
       // Now logged in, do something with user
   }
}