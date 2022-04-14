// ... log user into Firebase & initialize Realm app

const token = await getIdToken(firebaseUser); // using modular Firebase Web v9 SDK method auth.getIdToken() - https://firebase.google.com/docs/reference/js/auth#getidtoken
const credentials = Realm.Credentials.jwt(token);
const realmUser = await realmApp.logIn(credentials);
