import io.realm.RealmAny;
import io.realm.RealmObject;

public class Frog extends RealmObject {
    String name;
    RealmAny bestFriend;
    // realm-required empty constructor
    public Frog() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public RealmAny getBestFriend() { return bestFriend; }
    public void setBestFriend(RealmAny bestFriend) { this.bestFriend = bestFriend; }
}
