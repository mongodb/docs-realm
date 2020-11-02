import Realm from "realm";
const randomEmail = require('random-email');

let app: Realm.App;
let anonUser: any;
const email = randomEmail();
const password = "Pa55w0rd";

console.log(Realm.Credentials.emailPassword)
const credentials = Realm.Credentials.emailPassword(
    email,
    password
);

beforeAll(async () => {
    app = new Realm.App({ id: "tutsbrawl-qfxxj" });

    async function loginAnonymously(){
        const anonymousCredentials = Realm.Credentials.anonymous();
        anonUser = await app.logIn(anonymousCredentials);
        console.log(`Logged in with the user id: ${anonUser.id}`);
        return anonUser;
    }
    async function registerNewAccount(email: string,password: string){
        await app.emailPasswordAuth.registerUser(email, password).catch((err) => console.log(`An error occurred while registering: ${err}`));
    }
    // application user tries out the app by logging in anonymously
    anonUser = await loginAnonymously().catch((err) => console.log(`An error occurred while logging in anonymously: ${err}`));
    // after using the app for awhile the user decides to register:
    await registerNewAccount(email,password);
});

afterAll(async () => {
    async function deleteAnonUser(anonUser: Realm.User){
        // logging out of an anonymous user will delete the user
        await anonUser.logOut().catch((err) => console.log(`An error occurred while logging out: ${err}`));
    }
    // delete the anon user after logging in with an anonymous identity, then
    // registering as email/pass identity, then linking the two identities
    if(anonUser){
        await deleteAnonUser(anonUser);
    }
});


/* 
    Steps the app user follows:
    1. Creates an anonymous account to try out the app
    2. Decides to create a more permanent account (email/pass) once they decide they enjoy the app
    3. Links the temporary anonymous account with the permanent
       email-password account in order to retain their user data
    4. Deletes the temporary anonymous account
*/
describe("Linking Identities Tests", () => {
    afterEach(async () => {});

    test("links anon identity with email/pass identity", async () => {   
        expect.assertions(1); 
        // :code-block-start: link-identities
        async function linkAccounts(user: Realm.User,email: string,password: string){
            const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
                email,
                password
              );
            return user.linkCredentials(emailPasswordUserCredentials);
        }

        async function run(){
            const linkedAccount = await linkAccounts(anonUser,email, password)
              .catch((err) => console.log(`An error occurred while linking accounts: ${err}`));
            // :hide-start:
            const emailPasswordUser = await app.logIn(credentials)
              .catch((err) => console.log(`An error occurred while logging in anonymously; ${err}`));
            
            expect(linkedAccount).toStrictEqual(emailPasswordUser); // test if the linked account is the same user as the emailPass user
            // :hide-end:
        }
        // :hide-start:
        await run();
        /*
        // :replace-with:
        run();
        // :hide-end:
        // :code-block-end:
        */
    })
});

