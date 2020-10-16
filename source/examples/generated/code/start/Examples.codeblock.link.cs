// 1) A user logs on anonymously:
var anonUser = await app.LogInAsync(Credentials.Anonymous());
// 2) They create some data, and then decide they want to save
//    it, which requires creating an Email/Password account.
// 3) We prompt the user to log in, and then use that new
//    EmailPassword credential to link the existing anonymous
//    account:
var officialUser = await anonUser.LinkCredentialsAsync(
    Credentials.EmailPassword("caleb@example.com","shhhItsASektrit!"));