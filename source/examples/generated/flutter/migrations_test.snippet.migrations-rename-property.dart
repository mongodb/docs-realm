Configuration configWithRenamedAge =
    Configuration.local([Person.schema, Car.schema],
        schemaVersion: 2,
        migrationCallback: ((migration, oldSchemaVersion) {
  // Between v1 and v2 we renamed the Person 'age' property to 'yearsSinceBirth'
  migration.renameProperty('Person', 'age', 'yearsSinceBirth');
}));
Realm realmWithRenamedAge = Realm(configWithRenamedAge);
