import { useEffect, useContext } from "react";
import * as Realm from "realm-web";
import AppServicesContext from "../realm/AppServicesContext";
import Link from "next/link";

export default function Home() {
  const app = useContext(AppServicesContext);

  useEffect(() => {
    // For initial server-side render
    if (!app) return;
    // If no logged in user, log in
    if (!app.currentUser) {
      const anonymousUser = Realm.Credentials.anonymous();
      app.logIn(anonymousUser);
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
