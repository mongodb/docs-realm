var testItem = new Item
{
    Name = "Do this thing",
    Status = ItemStatus.Open.ToString(),
    Partition = "myPart"
};

await realm.WriteAsync(() =>
{
    realm.Add(testItem);
});
