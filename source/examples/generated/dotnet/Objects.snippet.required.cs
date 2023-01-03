public partial class Person : IRealmObject
{
    [Required]
    public string Name { get; set; }
    public IList<Dog> Dogs { get; }
}
