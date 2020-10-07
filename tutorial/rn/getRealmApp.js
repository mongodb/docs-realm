import Realm from "realm";

let app;

// :code-block-start: get-realm-app
// Returns the shared instance of the Realm app.
export function getRealmApp() {
  if (app === undefined) {
    // :hide-start:
    const appId = "tasktracker-qczfq"; // Set Realm app ID here.
    const appConfig = {
      id: appId,
      timeout: 10000,
      app: {
        name: "default",
        version: "0",
      },
    };
    app = new Realm.App(appConfig);
    // :replace-with:
    //// TODO: Create a Realm App instance with your Realm app ID.
    // :hide-end:
  }
  return app;
}
// :code-block-end:
