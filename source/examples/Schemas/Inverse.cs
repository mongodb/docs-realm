<<<<<<< HEAD
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
=======
// To-One relationship
public class Ship : RealmObject
{
    public Captain Captain { get; set; }
}

// To-Many relationship
public class Captain : RealmObject
{
    [Backlink(nameof(Ship.Captain))]
    public IQueryable<Ship> Ships { get; }
>>>>>>> 5763d8d... DOCSP-13320 added all code examples
}