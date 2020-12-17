class Dog : RealmObject
{
    // One to many relationship with Person.Dogs
    public Person Owner { get; set; }
}

class Person : RealmObject
{
    [Backlink(nameof(Dog.Owner))]
    public IQueryable<Dog> Dogs { get; }

    // Many to many relationship with Hobby.PeopleWithThatHobby
    public IList<Hobby> Hobbies { get; }
}

class Hobby : RealmObject
{
    [Backlink(nameof(Person.Hobbies))]
    public IQueryable<Person> PeopleWithThatHobby { get; }
}
