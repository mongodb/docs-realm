import { ObjectId } from "bson";

class Task {
  /**
   *
   * @param {string} name The name of the task
   * @param {string status The status of the task. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this task with
   */
  constructor({
    name,
    partition,
    status = Task.STATUS_OPEN,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.status = status;
  }

  static STATUS_OPEN = "Open";
  static STATUS_IN_PROGRESS = "InProgress";
  static STATUS_COMPLETE = "Complete";
  // :code-block-start: react-native-task-schema
  // :state-start: final
  static schema = {
    name: "Task",
    properties: {
      _id: "objectId",
      name: "string",
      status: "string",
    },
    primaryKey: "_id",
  };
  // :state-end: :state-uncomment-start: start
  //// TODO: implement schema
  // :state-uncomment-end:
  // :code-block-end:
}

export { Task };
