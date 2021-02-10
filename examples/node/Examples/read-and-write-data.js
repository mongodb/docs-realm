import Realm from "realm";

const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    name: "string",
    priority: "int?",
    progressMinutes: "int?",
  },
  primaryKey: "_id",
};

const PersonSchema = {
  name: "Person",
  properties: {
    name: "string",
  },
};
const DogSchema = {
  name: "Dog",
  properties: {
    name: "string",
    owner: "Person?",
    age: "int?",
  },
};

describe("Read & Write Data", () => {
  test("should find a specific object by primary key", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "myrealm",
      schema: [TaskSchema],
    });

    let task;

    // write to a realm
    realm.write(() => {
      task = realm.create("Task", {
        _id: 12342245,
        name: "Do the dishes",
      });
    });

    // :code-block-start: read-and-write-data-object-for-primary-key
    const myTask = realm.objectForPrimaryKey("Task", 12342245); // search for a realm object with a primary key that is an int.
    // :code-block-end:

    expect(myTask.name).toBe(task.name);

    realm.write(() => {
      // after running test delete the task
      realm.delete(task);
    });
    task = null;

    // close the realm
    realm.close();
  });
  test("should query an object type", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "myrealm",
      schema: [TaskSchema],
    });

    let task;

    // write to a realm
    realm.write(() => {
      task = realm.create("Task", {
        _id: 321512,
        name: "Walk the dog",
      });
    });

    // :code-block-start: read-and-write-data-query-an-object-type
    // Query realm for all instances of the "Task" type.
    const tasks = realm.objects("Task");
    // :code-block-end:

    expect(tasks[0].name).toBe(task.name);

    realm.write(() => {
      // after running test delete the task
      realm.delete(task);
    });
    task = null;

    // close the realm
    realm.close();
  });
  test("should return objects from filter queries", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "myrealm",
      schema: [TaskSchema],
    });
    let task, task2, task3;
    // write to a realm
    realm.write(() => {
      task = realm.create("Task", {
        _id: 191230,
        name: "go grocery shopping",
        priority: 10,
        progressMinutes: 50,
      });
      task2 = realm.create("Task", {
        _id: 325212012,
        name: "throw out the trash",
        priority: 4,
        progressMinutes: 0,
      });
      task3 = realm.create("Task", {
        _id: 43259540,
        name: "do the laundry",
        priority: 2,
        progressMinutes: 5,
      });
    });

    // :code-block-start: read-and-write-filter-queries
    // retrieve the set of Task objects
    const tasks = realm.objects("Task");
    // filter for tasks with a high priority
    const highPriorityTasks = tasks.filtered("priority > 5");
    // filter for tasks that have just-started or short-running progress
    const lowProgressTasks = tasks.filtered(
      "1 <= progressMinutes && progressMinutes < 10"
    );
    console.log(
      `Number of high priority tasks: ${highPriorityTasks.length} \n`,
      `Number of just-started or short-running tasks: ${lowProgressTasks.length}`
    );
    // :code-block-end:

    expect(highPriorityTasks[0].name).toBe(task.name); // expect that 'go grocery shopping' should be the first (and only) high priority
    expect(lowProgressTasks[0].name).toBe(task3.name); // expect that 'do the laundry' should be the first (and only) low progress task
    // delete tasks
    realm.write(() => {
      realm.delete(task);
      realm.delete(task2);
      realm.delete(task3);
    });
    // close the realm
    realm.close();
  });
  test("should return objects from sorted queries", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "myrealm",
      schema: [TaskSchema, PersonSchema, DogSchema],
    });
    let task, task2, task3, task4;
    // write to a realm
    realm.write(() => {
      task = realm.create("Task", {
        _id: 191230,
        name: "go grocery shopping",
        priority: 10,
        progressMinutes: 50,
      });
      task2 = realm.create("Task", {
        _id: 325212012,
        name: "throw out the trash",
        priority: 4,
        progressMinutes: 0,
      });
      task3 = realm.create("Task", {
        _id: 43259540,
        name: "wash and dry the laundry",
        priority: 2,
        progressMinutes: 5,
      });
      task4 = realm.create("Task", {
        _id: 24132021,
        name: "fold the laundry",
        priority: 2,
        progressMinutes: 0,
      });
    });

    let person1, person2;
    let dog1, dog2;
    realm.write(() => {
      person1 = realm.create("Person", {
        name: "Moe Chughtai",
      });
      person2 = realm.create("Person", {
        name: "Chris Bush",
      });
      dog1 = realm.create("Dog", {
        name: "Barky",
        owner: person1,
      });
      dog2 = realm.create("Dog", {
        name: "Fido",
        owner: person2,
      });
    });

    // :code-block-start: read-and-write-sorted-queries
    // retrieve the set of Task objects
    const tasks = realm.objects("Task");
    // Sort tasks by name in ascending order
    const tasksByName = tasks.sorted("name");
    // Sort tasks by name in descending order
    const tasksByNameDescending = tasks.sorted("name", true);
    // Sort tasks by priority in descending order and then by name alphabetically
    const tasksByPriorityDescendingAndName = tasks.sorted([
      ["priority", true],
      ["name", false],
    ]);
    // Sort dogs by dog's owner's name.
    let dogsByOwnersName = realm.objects("Dog").sorted("owner.name");
    // :code-block-end:

    // tasks sorted by name ascending
    expect(tasksByName.map((myTask) => myTask.name)).toStrictEqual([
      "fold the laundry",
      "go grocery shopping",
      "throw out the trash",
      "wash and dry the laundry",
    ]);

    // tasks sorted by name descending
    expect(tasksByNameDescending.map((myTask) => myTask.name)).toStrictEqual([
      "wash and dry the laundry",
      "throw out the trash",
      "go grocery shopping",
      "fold the laundry",
    ]);

    // tasks sorted by priority descending, and then by name ascending
    expect(
      tasksByPriorityDescendingAndName.map((myTask) => myTask.name)
    ).toStrictEqual([
      "go grocery shopping",
      "throw out the trash",
      "fold the laundry",
      "wash and dry the laundry",
    ]);
    // dogs by dog's owner's name.
    expect(JSON.stringify(dogsByOwnersName)).toBe(
      JSON.stringify([
        { name: "Fido", owner: { name: "Chris Bush" }, age: null },
        { name: "Barky", owner: { name: "Moe Chughtai" }, age: null },
      ])
    );

    // delete tasks, persons, and dogs
    realm.write(() => {
      realm.delete(task);
      realm.delete(task2);
      realm.delete(task3);
      realm.delete(task4);

      realm.delete(person1);
      realm.delete(person2);

      realm.delete(dog1);
      realm.delete(dog2);
    });
    // close the realm
    realm.close();
  });
  test("should write a new object", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "myrealm",
      schema: [DogSchema, PersonSchema],
    });
    // :code-block-start: read-and-write-create-a-new-object
    // Declare the instance.
    let dog;
    // Open a transaction.
    realm.write(() => {
      // Assign a newly-created instance to the variable.
      dog = realm.create("Dog", { name: "Max", age: 5 });
    });
    // :code-block-end:

    const dogs = realm.objects("Dog");

    expect(dogs[0].name).toBe(dog.name);

    // delete the dog
    realm.write(() => {
      realm.delete(dog);
    });
    realm.close();
  });
  test("should update an object", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "myrealm",
      schema: [DogSchema, PersonSchema],
    });
    let dog;
    realm.write(() => {
      dog = realm.create("Dog", { name: "Max", age: 2 });
    });

    // :code-block-start: read-and-write-update-an-object
    // Open a transaction.
    realm.write(() => {
      // Get a dog to update.
      const dog = realm.objects("Dog")[0];
      // Update some properties on the instance.
      // These changes are saved to the realm.
      dog.name = "Maximilian";
      dog.age += 1;
    });
    // :code-block-end:

    expect(dog.name).toBe("Maximilian");
    expect(dog.age).toBe(3);

    // delete the dog
    realm.write(() => {
      realm.delete(dog);
    });
    realm.close();
  });
});
