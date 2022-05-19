package com.mongodb.realm.examples.model.java;
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "FrogSet": "Frog"
//    }
// }
import io.realm.RealmObject;
import io.realm.RealmSet;

public class FrogSet extends RealmObject {
    String name;
    RealmSet<Snack> favoriteSnacks;
    // realm-required empty constructor
    public FrogSet() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public RealmSet<Snack> getFavoriteSnacks() { return favoriteSnacks; }
    public void setFavoriteSnacks(RealmSet<Snack> favoriteSnacks) { this.favoriteSnacks = favoriteSnacks; }
}
// :replace-end:
// :snippet-end: