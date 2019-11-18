public class Person extends RealmObject {
    @PrimaryKey
    public int id;

    @Required
    public String name;

    @LinkingObjects("owner")
    public final RealmResults<Dog> dogs = null;
}
