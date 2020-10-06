async function getRealm(partitionKey) {
  if (realms[partitionKey] == undefined) {
    realms[partitionKey] = openRealm(partitionKey);
  }
  return realms[partitionKey];
}