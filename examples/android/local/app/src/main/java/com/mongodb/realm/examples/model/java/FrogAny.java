package com.mongodb.realm.examples.model.java;
// :code-block-start: complete
// :replace-start: {
//    "terms": {
//       "FrogAny": "Frog"
//    }
// }
import io.realm.RealmAny;
import io.realm.RealmObject;

public class FrogAny extends RealmObject {
    String name;
    RealmAny bestFriend;
    // realm-required empty constructor
    public FrogAny() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public RealmAny getBestFriend() { return bestFriend; }
    public void setBestFriend(RealmAny bestFriend) { this.bestFriend = bestFriend; }
}
// :replace-end:
// :code-block-end: