import { useMemo } from "react";
import * as Realm from "realm-web";
import { setCookie } from "nookies";

function MyApp({ Component, pageProps }) {
  // useMemo with empty dependency array only computes value for `app` on mount
  const app = useMemo(() => new Realm.App(process.env.NEXT_PUBLIC_APP_ID), []);


  return (
    <>
        <Component {...pageProps} />
    </>
  );
}

export default MyApp;
