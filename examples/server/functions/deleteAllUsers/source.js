let token;
const apiUrl = "https://realm.mongodb.com/api/admin/v3.0/groups/5f60207f14dfb25d23101102/apps/5f6020d292050452b72032e2";

async function adminLogIn() {
  const username = context.values.get("adminApiPublicKey");
  const apiKey = context.values.get("adminApiPrivateKey");
  const response = await context.http.post({
    url: "https://realm.mongodb.com/api/admin/v3.0/auth/providers/mongodb-cloud/login",
    body: {username, apiKey},
    encodeBodyAsJSON: true,
  });
  const body = EJSON.parse(response.body.text());
  return body.access_token;
}

async function fetchUsers() {
  const response = await context.http.get({
    url: `${apiUrl}/users`,
    headers: {"Authorization": [`Bearer ${token}`]}
  });
  return EJSON.parse(response.body.text());
}

async function fetchPendingUsers() {
  const response = await context.http.get({
    url: `${apiUrl}/user_registrations/pending_users`,
    headers: {"Authorization": [`Bearer ${token}`]}
  });
  const users = EJSON.parse(response.body.text());
  return users;
}

async function deleteUser({_id}) {
  await context.http.delete({
    url: `${apiUrl}/users/${_id}`,
    headers: {"Authorization": [`Bearer ${token}`]}
  });
  return _id;
}

async function deletePendingUser({_id}) {
  const result = await context.http.delete({
    url: `${apiUrl}/user_registrations/by_id/${_id}`,
    headers: {"Authorization": [`Bearer ${token}`]}
  });
  console.log("chbus:", JSON.stringify(result));
  return _id;
}

exports = async function(arg) {
  token = await adminLogIn();
  
  const users = await fetchUsers();
  console.log(`Deleting ${users.length} user${users.length === 1 ? '' : 's'}.`);
  await Promise.all(users.map(deleteUser));
  
  const pendingUsers = await fetchPendingUsers();
  console.log(`Deleting ${pendingUsers.length} pending user${pendingUsers.length === 1 ? '' : 's'}.`);
  return await Promise.all(pendingUsers.map(deletePendingUser));
};
