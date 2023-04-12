interface Home extends Realm.Dictionary {
  address?: string;
  color?: string;
  price?: number;
  yearRenovated?: number;
}

class HomeOwner extends Realm.Object<HomeOwner> {
  name!: string;
  home!: Home;
  pets?: Pet[];

  static schema = {
    name: 'HomeOwner',
    properties: {
      name: 'string',
      home: '{}',
      pets: {
        type: 'dictionary',
        objectType: 'Pet',
        optional: true
      },
    },
  };
}
