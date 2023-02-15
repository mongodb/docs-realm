// :snippet-start: create-bundle
import Realm from 'realm';
import Cat from '../Models/Cat';
// open realm
const config = {
  schema: [Cat],
  path: 'bundle.realm',
};

async function createBundle() {
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
// :snippet-end:
