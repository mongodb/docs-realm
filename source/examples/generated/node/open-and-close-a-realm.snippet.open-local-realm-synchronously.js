// Synchronously open a local realm file with a particular path & predefined Car schema
try {
  const synchronouslyOpenedRealm = new Realm({
    schema: [Car],
  });

  synchronouslyOpenedRealm.close();
} catch (err) {
  console.error("Failed to open the realm", err.message);
}
