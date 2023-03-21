import Realm from 'realm';
import Cat from '../Models/Cat';

async function createBundle() {
  const config = {
    schema: [Cat.schema],
    path: 'bundle.realm',
  };
  const realm = await Realm.open(config);

  // add data to realm
  realm.write(() => {
    realm.create('Cat', {name: 'Jasper', birthday: 'Nov 2, 2000'});
    realm.create('Cat', {name: 'Maggie', birthday: 'December 4, 2007'});
    realm.create('Cat', {name: 'Sophie', birthday: 'July 10, 2019'});
  });

  realm.close();
}
createBundle();
