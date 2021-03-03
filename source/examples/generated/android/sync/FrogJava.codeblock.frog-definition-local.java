
import org.bson.types.ObjectId;

import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;

public class Frog extends RealmObject {
    @PrimaryKey
    public ObjectId _id;
    public String name;
    public int age;
    public String species;
    public String owner;

    public Frog(String name, int age, String species, String owner) {
        this.name = name;
        this.age = age;
        this.species = species;
        this.owner = owner;
        this._id = new ObjectId();
    }

    public Frog() {}

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public String getSpecies() { return species; }
    public void setSpecies(String species) { this.species = species; }
    public String getOwner() { return owner; }
    public void setOwner(String owner) { this.owner = owner; }
    public ObjectId getId() { return _id; }
    public void setId(ObjectId _id) { this._id = _id; }
}
