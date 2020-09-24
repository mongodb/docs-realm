public class Person extends RealmObject {
    @Required
    public String name;

    @Required
    public Date birthdate;

    public RealmList<Dog> dogs;
}

public class Dog extends RealmObject {
    @Required
    public String name;

    @Required
    public int age;

    public String breed;
}
