Configuration configWithoutPerson = Configuration.local([Car.schema],
    schemaVersion: 2,
    migrationCallback: ((migration, oldSchemaVersion) {
  // Between v1 and v2 we removed the Person type
  migration.deleteType('Person');
}));
Realm realmWithoutPerson = Realm(configWithoutPerson);
