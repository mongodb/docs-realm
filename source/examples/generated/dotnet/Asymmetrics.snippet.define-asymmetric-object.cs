private partial class Measurement : IAsymmetricObject
{
    [PrimaryKey, MapTo("_id")]
    public Guid Id { get; private set; } = Guid.NewGuid();
    public double Value { get; set; }
    public DateTimeOffset Timestamp { get; private set; } = DateTimeOffset.UtcNow;
}
