public class Migration implements RealmMigration {
  @Override
  public void migrate(DynamicRealm realm, long oldVersion, long newVersion) {

     // DynamicRealm exposes an editable schema
     RealmSchema schema = realm.getSchema();

     // Changes from version 1 to 2 (adding lastName) will occur
     // automatically when Realm detects the change
     
     // Migrate Person from version 2 to 3: replace firstName and
     // lastName with fullName

     // lastName doesn't exist in version 1, so only create fullName from firstName
     if (oldVersion < 2L) {
        schema.create("Person")
            .addField("fullName", String.class);

        realm.beginTransaction();
        for (Person person : realm.where(Person.class).findAll()) {
            person["fullName"] = person["firstName"];
        }
        realm.commitTransaction();

     // for users upgrading from version 2, create fullName from firstName and lastName
     } else if (oldVersion < 3L) {
        schema.create("Person")
            .addField("fullName", String.class);

        realm.beginTransaction();
        for (Person person : realm.where(Person.class).findAll()) {
            person["fullName"] = person["firstName"] + " " + person["lastName"];
        }
        realm.commitTransaction();
     }

     // Migrate Person from version 3 to 4: replace age with birthday
     if (oldVersion < 4L) {
        schema.create("Person")
            .addField("birthday", Date.class);

        realm.beginTransaction();
        for (Person person : realm.where(Person.class).findAll()) {
            Date birthYear = Date() - person.age;
            person["birthday"] = new Date(birthYear, 1, 1);
        }
        realm.commitTransaction();
     }
  }
};

@RealmModule(classes = { Person.class })
public class Module {}

RealmConfiguration config = new RealmConfiguration.Builder()
    .modules(new Module())
    .schemaVersion(4) // Must be bumped when the schema changes
    .migration(new Migration()) // Migration to run instead of throwing an exception
    .build();
