import * as Realm from "realm-web";
import Layout from "../components/layout";
import AppServicesContext from "../realm/AppServicesContext";

function MyApp({ Component, pageProps }) {
  const appServices = new Realm.App(process.env.NEXT_PUBLIC_APP_ID);

  return (
    <AppServicesContext.Provider value={appServices}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppServicesContext.Provider>
  );
}

export default MyApp;
