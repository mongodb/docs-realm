public class MyRealmValueObject : RealmObject
{
    [PrimaryKey]
    public Guid Id { get; set; }

    public RealmValue MyValue { get; set; }
}

private void TestRealmValue()
{
    var obj = new MyRealmValueObject();

    obj.MyValue = RealmValue.Null;
    // or
    obj.MyValue = 1;
    // or
    obj.MyValue = "abc";

    if (obj.MyValue.Type == RealmValueType.String)
    {
        var myString = obj.MyValue.AsString();
    }
}
