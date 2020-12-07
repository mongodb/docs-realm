public class Dog extends RealmObject {
  public String name;
  public RealmList<String> puppies = new RealmList<String>();
}