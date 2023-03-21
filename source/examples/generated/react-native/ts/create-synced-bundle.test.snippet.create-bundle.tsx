import Realm from 'realm';
import Cat from '../Models/Cat';


async function createSyncedBundle() {
  const app = new Realm.App(APP_ID);
  const user = await app.logIn(Realm.Credentials.anonymous());
  const config: Realm.Configuration = {
    schema: [Cat.schema],
    path: 'synced-bundle.realm',
    sync: {
      user,
      flexible: true,
      initialSubscriptions: {
        update: (subs, realm) => {
          subs.add(realm.objects('Cat'));
        },
      },
    },
  };
  const realm = await Realm.open(config);

  // add data to realm
  realm.write(() => {
    realm.create('Cat', {name: 'Jasper', birthday: 'Nov 2, 2000'});
    realm.create('Cat', {name: 'Maggie', birthday: 'December 4, 2007'});
    realm.create('Cat', {name: 'Sophie', birthday: 'July 10, 2019'});
  });

  // ensure synchronize all changes before copy
  await realm.syncSession?.uploadAllLocalChanges();
  await realm.syncSession?.downloadAllServerChanges();

  // Create new config with all same except the path
  const newConfig = {...config};
  newConfig.path = '"synced-copy.realm"';

  // Create bundled realm
  realm.writeCopyTo(newConfig);

  realm.close();
}
createSyncedBundle();
