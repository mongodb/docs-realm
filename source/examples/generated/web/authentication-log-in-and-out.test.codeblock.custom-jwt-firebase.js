// ... log user into Firebase & initialize Realm app

const token = await getIdToken(firebaseUser); // using modular Firebase Web v9 SDK
const credentials = Realm.Credentials.jwt(token);
const realmUser = await realmApp.logIn(credentials);
