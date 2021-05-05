import org.bson.types.ObjectId;

public class Plant {
    private ObjectId _id;
    private String name;
    private String sunlight;
    private String color;
    private String type;
    private String _partition;

    // empty constructor required for MongoDB Data Access POJO codec compatibility
    public Plant() {}

    public Plant(ObjectId _id, String name, String sunlight, String color, String type, String _partition) {
        this._id = _id;
        this.name = name;
        this.sunlight = sunlight;
        this.color = color;
        this.type = type;
        this._partition = _partition;
    }

    public ObjectId get_id() { return _id; }
    public void set_id(ObjectId _id) { this._id = _id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSunlight() { return sunlight; }
    public void setSunlight(String sunlight) { this.sunlight = sunlight; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String get_partition() { return _partition; }
    public void set_partition(String _partition) { this._partition = _partition; }
}
