let projectsSorted = projects.sorted(byKeyPath: "name", ascending: false)

// You can also sort on the members of linked objects. In this example,
// we sort the dogs by dog's owner's name.
let dogs = realm.objects(Dog.self)
let ownersByName = dogs.sorted(byKeyPath: "owner.name")
