export const InMemoryRealmContext = createRealmContext({
  schema: [Address, Contact],
  inMemory: true,
});
