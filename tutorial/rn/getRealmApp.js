import Realm from "realm";

let app;

// :code-block-start: get-realm-app
// Returns the shared instance of the Realm app.
export function getRealmApp() {
  if (app === undefined) {
    // :state-start: final
    // :replace-start: {
    //   "terms": { "tasktracker-qczfq": "<your Realm app ID here>" }
    // }
    const appId = "tasktracker-qczfq"; // Set Realm app ID here.
    // :replace-end:
    const appConfig = {
      id: appId,
      timeout: 10000,
      app: {
        name: "default",
        version: "0",
      },
    };
    app = new Realm.App(appConfig);
    // :state-end: :state-uncomment-start: start
    //// TODO: Create a Realm App instance with your Realm app ID.
    // :state-uncomment-end:
  }
  return app;
}
// :code-block-end:
