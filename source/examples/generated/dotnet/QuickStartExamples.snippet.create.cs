var testItem = new Item
{
    Name = "Do this thing",
    Status = ItemStatus.Open.ToString(),
    Partition = "myPart"
};

realm.Write(() =>
{
    realm.Add(testItem);
});
