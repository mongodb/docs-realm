const TaskSchema = {
  name: 'Task',
  properties: {
    _id: 'objectId',
    _partition: 'string',
    name: 'string',
    owner: 'string?',
    status: 'string',
  },
  primaryKey: '_id',
};