package com.mongodb.realm.examples.model.java;

import java.util.Date;

import io.realm.RealmObject;
import io.realm.annotations.Index;
import io.realm.annotations.PrimaryKey;

// :code-block-start: realm-object-model
public class Sample extends RealmObject {
    @PrimaryKey
    String stringField = "Realm";
    Byte byteField = 0xA;
    // no support for chars: no charField
    Short shortField = 17;
    Integer intField = 42;
    @Index
    Long longField = 256L;
    Boolean booleanField = true;
    Float floatField = 3.14f;
    Double doubleField = 1.19840122;
    Date timestampField = new Date();
}
// :code-block-end:
