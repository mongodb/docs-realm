import Realm from "realm";
import { Task } from "../models/Task";

// :snippet-start: bundle-realm-function-js
async function bundleRealm(originalConfig, copyPath) {
  // open realm with original config
  const originalRealm = await Realm.open(originalConfig);

  // ensure synchronize all changes before copy if synced realm
  if (originalRealm.syncSession) {
    await originalRealm.syncSession?.uploadAllLocalChanges();
    await originalRealm.syncSession?.downloadAllServerChanges();
  }

  // create config for copied realm
  const copyConfig = originalConfig;
  copyConfig.path = copyPath;

  // copy original realm
  originalRealm.writeCopyTo(copyConfig);

  // get location of copied realm
  const copiedRealm = await Realm.open(copyConfig);
  const bundledRealmLocation = copiedRealm.path;

  // close realms
  originalRealm.close();
  copiedRealm.close();

  // return location of new realm
  return bundledRealmLocation;
}
// :snippet-end:
async function run() {
  // :snippet-start: bundle-realm-local-realm
  const config = {
    schema: [Task.schema],
    path: "original.realm",
  };

  // :remove-start:
  const seedRealm = await Realm.open(config);
  seedRealm.write(() => {
    seedRealm.create("Task", Task.generate("milk!"));
  });
  // :remove-end:

  // create copy with unique name. the bundled realm must have a unique file path
  // for the Realm.writeCopyTo() method to  in the bundleRealm() function.
  const bundledRealmPath = `copy-${Date.now().toString()}.realm`;
  const bundledRealmFileLocation = await bundleRealm(config, bundledRealmPath);
  console.log(bundledRealmFileLocation); // location where you can
  // :snippet-end:
  seedRealm.write(() => {
    seedRealm.deleteModel("Task");
  });
  seedRealm.close();
}

export default run;
