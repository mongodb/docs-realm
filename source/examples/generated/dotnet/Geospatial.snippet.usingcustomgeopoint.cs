public partial class Company : IRealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public Guid Id { get; private set; } = Guid.NewGuid();

    public CustomGeoPoint? Location { get; set; }

    public Company(double lat, double lon)
    {
        this.Location = new CustomGeoPoint(lat, lon);
    }
}
