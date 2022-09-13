import { useEffect } from "react";
import * as Realm from "realm-web";
import Link from "next/link";

export default function Home() {
  const app = Realm.App.getApp(process.env.NEXT_PUBLIC_APP_ID);

  // note: useEffect runs in the browser but does not run during server-side rendering
  useEffect(() => {
    // If no logged in user, log in
    if (!app.currentUser) {
      const anonymousUser = Realm.Credentials.anonymous();
      app.logIn(anonymousUser);
    }
  }, [app, app?.currentUser, app?.currentUser?.id]);

  return (
    //Your app
  );
}
