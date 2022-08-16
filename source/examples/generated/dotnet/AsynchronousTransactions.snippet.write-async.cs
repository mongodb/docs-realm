var person = await realm.WriteAsync(() =>
    realm.Add(new Person()
    {
        Name = "John Doe"
    })
);

// you can use/modify person now
// without the need of using ThreadSafeReference
await realm.WriteAsync(() => person.Name = "Johnathan Doe");

