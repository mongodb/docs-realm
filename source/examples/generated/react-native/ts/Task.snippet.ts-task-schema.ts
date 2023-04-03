class Task extends Realm.Object<Task> {
  _id!: number;
  name!: string;
  priority?: number;
  progressMinutes?: number;
  assignee?: Person;
  age?: number;

  static schema = {
    name: 'Task',
    properties: {
      _id: 'int',
      name: 'string',
      priority: 'int?',
      progressMinutes: 'int',
      assignee: 'Person?',
    },
    primaryKey: '_id',
  };
}
