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
    //Your app
  );
}
