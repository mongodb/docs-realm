public class Person extends RealmObject {
  private String id;
  private String name;
  private RealmList<Dog> dogs;
  // getters and setters and constructor
}

public class Dog extends RealmObject {
  private String id;
  private String name;
  private String color;
  @LinkingObjects("dogs")
  private final RealmResults<Person> owners;
  // getters and setters and constructor
}