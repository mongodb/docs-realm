let app = App(id: YOUR_REALM_APP_ID)
// ... log in ...
// Get another user on the device, for example with `app.allUsers` 
let secondUser: User = getSomeOtherUser()

assert(app.currentUser != secondUser)

// Switch to another user
app.switch(to: secondUser)

// The switch-to user becomes the app.currentUser
assert(app.currentUser == secondUser)