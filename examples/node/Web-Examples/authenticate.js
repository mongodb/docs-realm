import * as Realm from "realm-web";

describe("user authentication", () => {

    test("login",  () => { 
        const app = new Realm.App({ id: "tutsbrawl-qfxxj" });
        // Create an anonymous credential
        const credentials = Realm.Credentials.anonymous();
        app.logIn(credentials).then((user)=>{
            expect(user.id).toBe(app.currentUser.id);
        })

    })
})