const projects = realm.objects("Project");

// Sort projects by name in ascending order
let projectsSorted = projects.sorted("name");

// Sort projects by name in descending order
projectsSorted = projects.sorted("name", true);

const tasks = realm.objects("Task");

// Sort by priority in descending order and then by name alphabetically
let tasksSorted = tasks.sorted([["priority", true], ["name", false]]);

// You can also sort on the members of linked objects. In this example,
// we sort the dogs by dog's owner's name.
const dogs = realm.objects("Dog");
dogs = dogs.sorted("owner.name");
