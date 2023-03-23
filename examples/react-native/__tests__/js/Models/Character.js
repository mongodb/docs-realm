import Realm from 'realm';

// :snippet-start: js-character-schema
class Character extends Realm.Object {
  static schema = {
    name: 'Character',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      name: 'string',
      levelsCompleted: 'int<>',
      inventory: 'string<>',
    },
  };
}
// :snippet-end:
export default Character;
