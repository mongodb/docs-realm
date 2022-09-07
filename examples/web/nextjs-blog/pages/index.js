// :snippet-start: log-in-index-js
import { useEffect } from "react";
import * as Realm from "realm-web";
import Link from "next/link";

export default function Home() {
  const app = Realm.App.getApp(process.env.NEXT_PUBLIC_APP_ID);

  // only runs on the client
  useEffect(() => {
    // If no logged in user, log in
    if (!app.currentUser) {
      const anonymousUser = Realm.Credentials.anonymous();
      app.logIn(anonymousUser);
    }
  }, [app, app?.currentUser, app?.currentUser?.id]);

  return (
    //Your app
    // :remove-start:
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
    // :remove-end:
  );
}
// :snippet-end:
