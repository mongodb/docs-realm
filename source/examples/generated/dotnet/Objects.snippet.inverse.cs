partial class Dog : IRealmObject
{
    // To-one relationship from the Dog to its owner
    public Person Owner { get; set; }
}

partial class Person : IRealmObject
{
    // An inverse relationship that returns all Dog instances that have Dog.Owner set to
    // the current Person.
    [Backlink(nameof(Dog.Owner))]
    public IQueryable<Dog> Dogs { get; }

    // To-many relationship, containing a collection of all hobbies the current person enjoys
    public IList<Hobby> Hobbies { get; }
}

partial class Hobby : IRealmObject
{
    // An inverse relationship that returns all Person instances that have the current Hobby
    // instance in their Hobbies list.
    [Backlink(nameof(Person.Hobbies))]
    public IQueryable<Person> PeopleWithThatHobby { get; }
}
