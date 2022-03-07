import Realm from "realm";
const {
  BSON: { ObjectId },
} = Realm;

// :snippet-start: rql-data-models
const TaskModel = {
  name: "Task",
  properties: {
    id: "objectId",
    name: "string",
    isComplete: { type: "bool", default: false },
    assignee: "string?",
    priority: {
      type: "int",
      default: 0,
    },
    progressMinutes: {
      type: "int",
      default: 0,
    },
  },
  primaryKey: "id",
};

const ProjectModel = {
  name: "Project",
  properties: {
    id: "objectId",
    name: "string",
    tasks: "Task[]",
    quota: "int?",
  },
  primaryKey: "id",
};
// :snippet-end:

describe("test models", async () => {
  let realm;
  const config = {
    schema: [TaskModel, ProjectModel],
    path: "testing.realm",
  };
  beforeEach(async () => {
    realm = await Realm.open(config);
  });
  afterEach(() => {
    realm.write(() => {
      realm.deleteAll();
    });
    realm.close();
    expect(realm.isClosed).toBe(true);
  });
  afterAll(() => {
    Realm.deleteFile(config);
  });
  test("open realm with config", async () => {
    expect(realm.isClosed).toBe(false);
  });
  test("Can create object of Task type", () => {
    realm.write(() => {
      realm.create("Task", {
        id: new ObjectId(),
        name: "get coffee",
      });
    });
    const coffeeTask = realm.objects("Task")[0];
    expect(coffeeTask.id instanceof ObjectId).toBe(true);
    expect(coffeeTask.name).toBe("get coffee");
    expect(coffeeTask.isComplete).toBe(false);
  });
  test("Can create object of Project type", () => {
    realm.write(() => {
      const teaTask = realm.create("Task", {
        id: new ObjectId(),
        name: "get tea",
      });
      realm.create("Project", {
        id: new ObjectId(),
        name: "beverages",
        tasks: [teaTask],
      });
    });
    const bevProject = realm.objects("Project")[0];
    expect(bevProject.id instanceof ObjectId).toBe(true);
    expect(bevProject.name).toBe("beverages");
    expect(bevProject.tasks[0].name).toBe("get tea");
  });
});
