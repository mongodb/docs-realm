import Realm from 'realm';

// TODO: Replace `static schema` with TS-first models + realm-babel-plugin (https://www.npmjs.com/package/@realm/babel-plugin) approach once realm-babel-plugin version 0.1.2 releases with bug fixes
// :snippet-start: ts-person-schema
interface Home extends Realm.Dictionary {
  address?: string;
  color?: string;
  price?: number;
  yearRenovated?: number;
}

class HomeOwner extends Realm.Object<HomeOwner> {
  name!: string;
  home!: Home;

  static schema = {
    name: 'HomeOwner',
    properties: {
      name: 'string',
      home: '{}',
    },
  };
}
// :snippet-end:
export default HomeOwner;
