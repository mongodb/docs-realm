public class Dog extends RealmObject {
    @Required
    private String name;
    public String  getName() { return name; }
    public void    setName(String name) { this.name = name; }

    @Required
    private int    age;
    public int     getAge() { return age; }
    public void    setAge(int age) { this.age = age; }

    private String breed;
    public int     getBreed() { return breed; }
    public void    setBreed(String breed) { this.breed = breed; }

    private Person owner;
    public int     getOwner() { return person; }
    public void    setOwner(Person person) { this.person = person; }
}
