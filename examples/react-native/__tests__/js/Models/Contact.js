import Realm from 'realm';

// :snippet-start: js-contact-schema
class Contact extends Realm.Object {
  static schema = {
    name: "Contact",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      name: "string",
      address: "Address", // Embed a single object
    },
  };
}
// :snippet-end:
export default Contact;