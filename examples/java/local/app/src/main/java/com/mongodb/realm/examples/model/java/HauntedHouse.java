package com.mongodb.realm.examples.model.java;
// :code-block-start: complete
import io.realm.MutableRealmInteger;
import io.realm.RealmObject;
import io.realm.annotations.Required;

public class HauntedHouse extends RealmObject {
    @Required
    private final MutableRealmInteger ghosts = MutableRealmInteger.valueOf(0);
    public HauntedHouse() {}
    public MutableRealmInteger getGhosts() { return ghosts; }
}
// :code-block-end: