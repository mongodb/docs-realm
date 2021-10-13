const PetOwnerSchema = {
  name: "PetOwner",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    person: "Person",
    pets: {
      type: "list",
      objectType: "string", // could also be of a Realm object, like "Pet"
      optional: false //null values are not allowed
    },
  },
};
