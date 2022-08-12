import { useEffect, useContext } from "react";
import { logInAnon, setAccessTokenCookie } from "../realm/auth";
import AppServicesContext from "../realm/AppServicesContext";
import Link from "next/link";

export default function Home() {
  const app = useContext(AppServicesContext);

  useEffect(() => {
    if (!app) return;
    if (!app.currentUser) {
      logInAnon(app);
    } else {
      setAccessTokenCookie(app.currentUser);
    }
  }, [app, app?.currentUser, app?.currentUser?.id]);
  console.log(app);

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
