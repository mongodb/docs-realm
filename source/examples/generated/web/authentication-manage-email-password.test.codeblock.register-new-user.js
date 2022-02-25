const now = new Date();
const nonce = now.getTime();
const email = `someone-${nonce}@example.com`;
const password = "Pa55w0rd";
await app.emailPasswordAuth.registerUser({ email, password });
