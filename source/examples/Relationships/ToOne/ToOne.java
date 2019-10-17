public class Person extends RealmObject {
    @Required
    public String name;

    @Required
    public Date birthdate;

    public Dog dog;
}

public class Dog extends RealmObject {
    @Required
    public String name;

    @Required
    public int age;

    public String breed;
}
