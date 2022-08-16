const TWENTY_MIN_MS = 1200000;
setInterval(async () => {
  await user.refreshCustomData();
  setCookie(null, "accessToken", user.accessToken);
}, TWENTY_MIN_MS);
