import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import './utils.dart';

part 'manage_sync_session_test.g.dart';

late App app;
late Realm realm;
late User user;
const APP_ID = "flutter-flexible-luccm";

@RealmModel()
class _Car {
  @MapTo('_id')
  @PrimaryKey()
  late ObjectId id;

  late String make;
  late String? model;
  late int? miles;
}

main() {
  app = App(AppConfiguration(APP_ID));
  setUp(() async {
    await app.logIn(Credentials.anonymous());
    final config = Configuration.flexibleSync(user, [Car.schema]);
    await Realm.open(config);
  });
  tearDown(() async {
    cleanUpRealm(realm, app);
  });
  group("Manage sync session - ", () {
    test("Wait for changes to upload and download", () async {
      // :snippet-start: wait-upload-download
      // Wait to download all pending changes from Atlas
      await realm.syncSession.waitForDownload();

      // :remove-start:
      final syncProgress = realm.syncSession.getProgressStream(
          ProgressDirection.upload, ProgressMode.forCurrentlyOutstandingWork);
      var called = false;
      syncProgress.listen((syncProgressEvent) {
        if (called == false) {
          expect(syncProgressEvent.transferableBytes > 0, isTrue);
          expect(syncProgressEvent.transferredBytes > 0, isTrue);
          called = true;
        }
      });
      // :remove-end:
      // Add data locally
      realm.write(() {
        realm.addAll<Car>([
          Car(ObjectId(), "Hyundai"),
          Car(ObjectId(), "Kia"),
          Car(ObjectId(), "Lincoln")
        ]);
      });
      // Wait for changes to upload to Atlas before continuing execution.
      await realm.syncSession.waitForUpload();
      // :snippet-end:
      expect(called, isTrue);
    });
    test("Pause and resume sync session", () async {
      // Pause the sync session
      realm.syncSession.pause();

      // Data that you add while the sync session is paused does not sync to Atlas.
      // However, the data is still added to the realm locally.
      realm.write(() {
        realm.addAll<Car>([
          Car(ObjectId(), "Volvo"),
          Car(ObjectId(), "Genesis"),
          Car(ObjectId(), "VW")
        ]);
      });

      // Resume sync session. Now, the data you wrote to the realm
      // syncs to Atlas.
      realm.syncSession.resume();
    });
    test("Monitor sync progress", () async {
      // TODO: add
    });
    test("Monitor network connection", () async {
      // :snippet-start: get-network-connection
      if (realm.syncSession.connectionState == ConnectionState.connected) {
        // ... do stuff
      }
      // :snippet-end:
      // :snippet-start: monitor-network-connection
      final connectionStream = realm.syncSession.connectionStateChanges;
      connectionStream.listen((connectionStateChange) {
        if (connectionStateChange.current == ConnectionState.connected) {
          print("Connected to Atlas Device Sync server");
        }
      });
      // :snippet-end:
    });
  });
}
