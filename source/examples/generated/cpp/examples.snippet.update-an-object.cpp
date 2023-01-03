// Query for the object you want to update
auto dogs = realm.objects<Dog>();
auto dogsNamedMaui = dogs.where("name == $0", {"Maui"});
CHECK(dogsNamedMaui.size() >= 1);
// Access an object in the results set. 
auto mauiPointer = dogsNamedMaui[0];

std::cout << "Dog " << mauiPointer->name << " is " << mauiPointer->age << " years old\n";

// Assign a new value to a member of the object in a write transaction
realm.write([&realm, &mauiPointer] {
    mauiPointer->age = 2;
});

std::cout << "Dog " << mauiPointer->name << " is " << mauiPointer->age << " years old\n";
