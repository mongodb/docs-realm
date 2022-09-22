// :snippet-start: custom-app-wrapper
import { useMemo } from "react";
import * as Realm from "realm-web";
import Layout from "../components/layout"; // :remove:
import useApp from "../components/useApp";
// :state-start: ssr
import { setCookie } from "nookies";
// Import the useEffect hook
import { useEffect } from "react";
// :state-end:

function MyApp({ Component, pageProps }) {
  // useMemo with empty dependency array only computes value for `app` on mount
  const app = useApp();

  // :state-start: ssr
  // Reset the user access token in cookies on a regular interval
  useEffect(() => {
    const user = app?.currentUser;
    if (user) {
      setCookie(null, "accessToken", user.accessToken);
      // Refresh token before session expires
      const TWENTY_MIN_MS = 1200000;
      const resetAccessToken = setInterval(async () => {
        await app?.currentUser?.refreshCustomData();
        setCookie(null, "accessToken", user.accessToken);
      }, TWENTY_MIN_MS);
      // Clear interval setting access token whenever component unmounts or
      // there's a change in user.
      return () => clearInterval(resetAccessToken);
    }
  }, [app, app?.currentUser]);
  // :state-end:

  return (
    <>
      {/* :remove-start:*/}
      <Layout>
        {/* :remove-end: */}
        <Component {...pageProps} app={app} />
        {/* :remove-start:*/}
      </Layout>
      {/* :remove-end: */}
    </>
  );
}

export default MyApp;
// :snippet-end:
