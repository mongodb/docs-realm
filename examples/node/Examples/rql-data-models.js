import Realm from "realm";
import { TaskModel, ProjectModel } from "./schemas/rql-data-models";

describe("test models", () => {
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
        id: new Realm.BSON.ObjectId(),
        name: "get coffee",
      });
    });
    const coffeeTask = realm.objects("Task")[0];
    expect(coffeeTask.id instanceof Realm.BSON.ObjectId).toBe(true);
    expect(coffeeTask.name).toBe("get coffee");
    expect(coffeeTask.isComplete).toBe(false);
  });
  test("Can create object of Project type", () => {
    realm.write(() => {
      const teaTask = realm.create("Task", {
        id: new Realm.BSON.ObjectId(),
        name: "get tea",
      });
      realm.create("Project", {
        id: new Realm.BSON.ObjectId(),
        name: "beverages",
        tasks: [teaTask],
      });
    });
    const bevProject = realm.objects("Project")[0];
    expect(bevProject.id instanceof Realm.BSON.ObjectId).toBe(true);
    expect(bevProject.name).toBe("beverages");
    expect(bevProject.tasks[0].name).toBe("get tea");
  });
});
