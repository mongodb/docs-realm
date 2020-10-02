let params = [
   "username": "bob"
]
      
var e: NSError?
  
app.login(credentials: Credentials(functionPayload: params, error: &e)) { (user, error) in
   DispatchQueue.main.sync {
       guard error == nil else {
           print("Login failed: \(error!)")
           return
       }
       // Now logged in, do something with user
   }
}