public class MyRealmClass : RealmObject
{
    [PrimaryKey]
    public int _id { get; set; }
    public RealmInteger<int> Counter { get; set; }
}
