import * as Realm from "realm-web";
import { setCookie } from "nookies";

async function logInAnon(app) {
  const anonymousUser = Realm.Credentials.anonymous();
  await app.logIn(anonymousUser);
  setAccessTokenCookie(app.currentUser);
}

function setAccessTokenCookie(user) {
  setCookie(null, "accessToken", user.accessToken);
  const TWENTY_MIN_MS = 1200000;
  setInterval(async () => {
    await user.refreshCustomData();
    setCookie(null, "accessToken", user.accessToken);
  }, TWENTY_MIN_MS);
}

export { logInAnon, setAccessTokenCookie };
