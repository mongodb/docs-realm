class User {
  public _id: ObjectId = "";
  public _partition: string = "";
  public name: string = "";
  public tasks: Realm.List<Task>;

  public static schema: Realm.ObjectSchema = {
    name: "User",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      _partition: "string",
      name: "string",
      tasks: "Task[]"
    }
  };
}

class Task {
  public _id: ObjectId = "";
  public _partition: string = "";
  public text: string;
  public assignee: Realm.Results<User>;

  public static schema: Realm.ObjectSchema = {
    name: "Task",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      _partition: "string",
      text: "string",
      assignee: {
        type: 'linkingObjects',
        objectType: 'User',
        property: 'tasks'
      }
    }
  };
};
