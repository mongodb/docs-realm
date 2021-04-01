let config = Realm.Configuration(
    schemaVersion: 1,
    migrationBlock: { migration, oldSchemaVersion in
        // We haven’t migrated anything yet, so oldSchemaVersion == 0
        if oldSchemaVersion < 1 {
            // The renaming operation should be done outside of calls to `enumerateObjects(ofType: _:)`.
            migration.renameProperty(onType: Person.className(), from: "yearsSinceBirth", to: "age")
        }
    })
