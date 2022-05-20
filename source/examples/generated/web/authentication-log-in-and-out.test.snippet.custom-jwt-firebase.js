// ... log user into Firebase & initialize Realm app

// Using modular Firebase Web v9 SDK method auth.getIdToken()
// See Firebase docs - https://firebase.google.com/docs/reference/js/auth#getidtoken
const token = await getIdToken(firebaseUser);
const credentials = Realm.Credentials.jwt(token);
const realmUser = await realmApp.logIn(credentials);
