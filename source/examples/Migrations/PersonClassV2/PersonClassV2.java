public class Person extends RealmObject { // Realm schema version 2
    @Required
    public String firstName;
    @Required
    public String lastName;
    @Required
    public int age;
}