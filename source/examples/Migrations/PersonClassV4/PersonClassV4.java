public class Person extends RealmObject { // Realm schema version 4
    @Required
    public String fullName;
    @Required
    public Date birthday = Date();
}
