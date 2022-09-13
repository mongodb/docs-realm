import { useMemo } from "react";
import * as Realm from "realm-web";
import { setCookie } from "nookies";
// Import the useEffect hook
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  // useMemo with empty dependency array only computes value for `app` on mount
  const app = useMemo(() => new Realm.App(process.env.NEXT_PUBLIC_APP_ID), []);

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
  }, [app, app?.currentUser, app?.currentUser?.id]);

  return (
    <>
        <Component {...pageProps} />
    </>
  );
}

export default MyApp;
