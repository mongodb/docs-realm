public class Dog extends RealmObject {
    @Required
    public String name;

    public int age;

    public String breed;

    public Person owner;
}
