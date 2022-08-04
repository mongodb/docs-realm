Person person2;
using (var transaction = await realm.BeginWriteAsync())
{
    person2 = realm.Add(new Person
    {
        Name = "Jane Doe"
    });
    // Do other work that needs to be included in this transaction
    await transaction.CommitAsync();
}
Console.WriteLine(person2.Name); // Jane Doe
