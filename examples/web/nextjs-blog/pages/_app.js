// :snippet-start: custom-app-wrapper
import { useEffect, useMemo } from "react";
import * as Realm from "realm-web";
// :remove-start:
import Layout from "../components/layout";
// :remove-end:
import AppServicesContext from "../realm/AppServicesContext";
import { setCookie } from "nookies";

function MyApp({ Component, pageProps }) {
  // useMemo with empty dependency array only computes value for appServices on mount
  const appServices = useMemo(
    () => new Realm.App(process.env.NEXT_PUBLIC_APP_ID),
    []
  );

  // Reset the user access token in cookies on a regular interval
  useEffect(() => {
    const user = appServices?.currentUser;
    if (user) {
      // Refresh token before session expires
      const TWENTY_MIN_MS = 1200000;
      const resetAccessToken = setInterval(async () => {
        await appServices?.currentUser?.refreshCustomData();
        setCookie(null, "accessToken", user.accessToken);
      }, TWENTY_MIN_MS);
      // Clear interval setting access token whenever component unmounts or
      // there's a change in user.
      return () => clearInterval(resetAccessToken);
    }
  }, [appServices, appServices?.currentUser, appServices?.currentUser?.id]);

  return (
    <AppServicesContext.Provider value={appServices}>
      {/* :remove-start:*/}
      <Layout>
        {/* :remove-end: */}
        <Component {...pageProps} />
        {/* :remove-start:*/}
      </Layout>
      {/* :remove-end: */}
    </AppServicesContext.Provider>
  );
}

export default MyApp;
// :snippet-end:
