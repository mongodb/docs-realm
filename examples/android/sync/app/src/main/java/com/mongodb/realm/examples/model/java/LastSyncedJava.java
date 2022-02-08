package com.mongodb.realm.examples.model.java;
// :code-block-start: last-synced-java-definition
// :replace-start: {
//    "terms": {
//       "LastSyncedJava": "LastSynced"
//    }
// }
import org.bson.types.ObjectId;
import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;

public class LastSyncedJava extends RealmObject {
    protected Long timestamp;
    @PrimaryKey
    public ObjectId _id;

    public LastSyncedJava(Long timestamp, ObjectId id) {
        this.timestamp = timestamp;
        this._id = id;
    }

    public LastSyncedJava() {}

    public Long getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }
}
// :replace-end:
// :code-block-end: