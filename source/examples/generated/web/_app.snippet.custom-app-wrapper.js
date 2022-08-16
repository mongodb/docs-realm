import * as Realm from "realm-web";
import AppServicesContext from "../realm/AppServicesContext";

function MyApp({ Component, pageProps }) {
  const appServices = new Realm.App(process.env.NEXT_PUBLIC_APP_ID);

  return (
    <AppServicesContext.Provider value={appServices}>
        <Component {...pageProps} />
    </AppServicesContext.Provider>
  );
}

export default MyApp;
