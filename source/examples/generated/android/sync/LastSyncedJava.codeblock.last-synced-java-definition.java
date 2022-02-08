import org.bson.types.ObjectId;
import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;

public class LastSynced extends RealmObject {
    protected Long timestamp;
    @PrimaryKey
    public ObjectId _id;

    public LastSynced(Long timestamp, ObjectId id) {
        this.timestamp = timestamp;
        this._id = id;
    }

    public LastSynced() {}

    public Long getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }
}
