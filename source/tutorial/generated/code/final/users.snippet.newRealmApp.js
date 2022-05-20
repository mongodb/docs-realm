const app = new Realm.App(appConfig);
/*  Change the logLevel to increase or decrease the 
    amount of messages you see in the console.
    Valid options are:
    fatal, error, warn, info, detail, debug, and trace
*/
Realm.App.Sync.setLogLevel(app, "error");

