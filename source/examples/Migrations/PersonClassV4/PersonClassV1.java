public class Person extends RealmObject {
    @Required
    public String fullName;
    @Required
    public Date birthday = Date();
}
