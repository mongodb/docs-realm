package com.mongodb.realm.examples.model.java;

import com.mongodb.realm.examples.model.kotlin.Frog;

import io.realm.RealmObject;
// :code-block-start: one-to-one-relationship
public class Child
        extends RealmObject {
    public Frog frog = null;
}
// :code-block-end:
