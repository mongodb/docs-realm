import org.bson.Document;
import org.bson.types.ObjectId;

public class Plant extends Document {
    ObjectId _id;
    String name;
    String sunlight;
    String color;
    String type;
    String _partition;

    public Plant(ObjectId _id, String name, String sunlight, String color, String type, String _partition) {
        this._id = _id;
        this.name = name;
        this.sunlight = sunlight;
        this.color = color;
        this.type = type;
        this._partition = _partition;
    }
}
