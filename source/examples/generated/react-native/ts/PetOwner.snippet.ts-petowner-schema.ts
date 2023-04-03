class PetOwner extends Realm.Object<PetOwner> {
  name!: string;
  birthDate?: Date;
  pet?: Pet;

  static schema = {
    name: 'PetOwner',
    properties: {
      name: 'string',
      birthdate: 'date',
      pet: 'Pet?',
    },
  };
}
