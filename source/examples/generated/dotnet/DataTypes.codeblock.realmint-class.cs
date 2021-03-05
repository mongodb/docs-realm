public class MyRealmClass : RealmObject
{
    [PrimaryKey]
    public int Id { get; set; }
    public RealmInteger<int> Counter { get; set; }
}
