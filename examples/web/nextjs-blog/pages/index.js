import { useEffect, useContext } from "react";
import * as Realm from "realm-web";
import { setCookie } from "nookies";
import AppServicesContext from "../realm/AppServicesContext";
import Link from "next/link";

// Set access token as a cookie for use with server-side rendering
function setAccessTokenCookie(user) {
  setCookie(null, "accessToken", user.accessToken);
  // Refresh token before session expires
  const TWENTY_MIN_MS = 1200000;
  setInterval(async () => {
    await user.refreshCustomData();
    setCookie(null, "accessToken", user.accessToken);
  }, TWENTY_MIN_MS);
}

export default function Home() {
  const app = useContext(AppServicesContext);

  useEffect(() => {
    // For initial server-side render
    if (!app) return;
    // If no logged in user, log in
    if (!app.currentUser) {
      const anonymousUser = Realm.Credentials.anonymous();
      app.logIn(anonymousUser).then((user) => setAccessTokenCookie(user));
    }
    // If logged in user, just set access token as cookie
    else {
      setAccessTokenCookie(app.currentUser);
    }
  }, [app, app?.currentUser, app?.currentUser?.id]);

  return (
    <div>
      <h1>Realm Web & Next.js Examples</h1>
      <ul>
        <li>
          <Link href="/mongodb-data-access">
            MongoDB Data Access (Client-side rendering)
          </Link>
        </li>
        <li>
          <Link href="/graphql">Atlas GraphQL API (Client-side rendering)</Link>
        </li>
        <li>
          <Link href="/server-side-rendering">Server Side Rendering</Link>
        </li>
        <li>
          <Link href="/static-rendering">Static Rendering</Link>
        </li>
      </ul>
    </div>
  );
}
