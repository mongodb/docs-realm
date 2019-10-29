public class Migration implements RealmMigration {
  @Override
  public void migrate(DynamicRealm realm, long oldVersion, long newVersion) {
  
     // DynamicRealm exposes an editable schema
     RealmSchema schema = realm.getSchema();
     
     if (oldVersion == 1) {
        schema.create("Person")
            .addField("fullName", String.class)
            .addField("age", int.class);
        
        realm.beginTransaction();
        for (Person person : realm.where(Person.class).findAll()) {
            person["fullName"] = person["firstName"] + " " + person["lastName"];
        }
        realm.commitTransaction();
        
        oldVersion++;
     }
  }
};

@RealmModule(classes = { Person.class })
public class Module {}

RealmConfiguration config = new RealmConfiguration.Builder()
    .modules(new Module())
    .schemaVersion(2) // Must be bumped when the schema changes
    .migration(new Migration()) // Migration to run instead of throwing an exception
    .build();
