package com.mongodb.realm.examples.model.java;

import com.mongodb.realm.examples.model.kotlin.Frog;

import io.realm.RealmList;
import io.realm.RealmObject;

// :code-block-start: one-to-many-relationship
public class Kid
        extends RealmObject {
    public RealmList<Frog> frogs =
            new RealmList<Frog>();
}
// :code-block-end:
