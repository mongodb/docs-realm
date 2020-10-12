public class Plant
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; }

    [MapTo("name")]
    public string Name { get; set; }

    [MapTo("sunlight")]
    public Sunlight Sunlight { get; set; }

    [MapTo("color")]
    public PlantColor Color { get; set; }

    [MapTo("type")]
    public PlantType Type { get; set; }

    [MapTo("_partition")]
    public string Partition { get; set; }

    public Plant()
    { }
}
public enum Sunlight
{
    full,
    partial
}
public enum PlantColor
{
    white,
    green,
    yellow,
    purple
}
public enum PlantType
{
    perennial,
    annual
}