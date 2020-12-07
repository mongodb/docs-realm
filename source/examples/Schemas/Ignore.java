public class Dog extends RealmObject {
    public String name;

    public int age;

    public String breed;

    public Person owner;

    @Ignore
    public String misbehavior;

    public Dog(String name, int age, String breed, Person owner, String misbehavior) {
        if (name != null) {
            this.name = name;
        } else {
            this.name = "";
        }
        this.age = age;
        this.breed = breed;
        this.owner = owner;
        this.misbehavior = misbehavior;
    }
}
