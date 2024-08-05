import 'dart:async';
import 'dart:developer';
import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import './utils.dart';
part 'open_flexible_sync_realm_test.realm.dart';

@RealmModel()
class _Tricycle {
  @PrimaryKey()
  @MapTo('_id')
  late int id;
  late String name;
}

@RealmModel()
class _Car {
  @PrimaryKey()
  @MapTo("_id")
  late ObjectId id;

  late String make;
  late String? model;
  late int? miles;
}

void main() {
  group('Open Flexible Sync Realm', () {
    const appId = "flutter-flexible-luccm";
    final appConfig = AppConfiguration(appId);
    final app = App(appConfig);
    test("Open Flexible Sync Realm", () async {
      final credentials = Credentials.anonymous();
      // :snippet-start: open-flexible-sync-realm
      final currentUser = await app.logIn(credentials);
      final config = Configuration.flexibleSync(currentUser, [Tricycle.schema],
          path: 'flex.realm');
      final realm = Realm(config);
      // :snippet-end:
      expect(realm.isClosed, false);
      expect(app.currentUser?.id != null, true);
      await cleanUpRealm(realm, app);
      expect(realm.isClosed, true);
      expect(app.currentUser, null);
    });
    test('Async Open Flexible Sync Realm', () async {
      final credentials = Credentials.anonymous();
      final currentUser = await app.logIn(credentials);
      // :snippet-start: async-open
      // Helper function to check if device is connected to the internet.
      Future<bool> isDeviceOnline() async {
        // ...logic to check if device is online
        return true; // :remove:
      }

      final config = Configuration.flexibleSync(currentUser, [Tricycle.schema]);
      // Only use asynchronous open if app is online.
      late Realm realm;
      if (await isDeviceOnline()) {
        // If the device is online, download changes and then open the realm.
        realm = await Realm.open(config);
      } else {
        // If the device is offline, open the realm immediately
        // and automatically sync changes in the background when the device is online.
        realm = Realm(config);
      }
      // :snippet-end:
      expect(realm.isClosed, false);
      cleanUpRealm(realm, app);
    });

    test('CHT', () async {
      final credentials = Credentials.anonymous();
      final currentUser = await app.logIn(credentials);
      late double progress = -1;
      final config = Configuration.flexibleSync(currentUser, [Tricycle.schema]);

      final realm = Realm(config);
      final sub = realm.syncSession.getProgressStream(ProgressDirection.download, ProgressMode.reportIndefinitely).listen((syncProgress) {
          print("listen to me");
          progress = syncProgress.progressEstimate;
          if (syncProgress.progressEstimate == 1.0) {
             // Transfer is complete
          }
      });
      print('here');
      final query = realm.query<Tricycle>(r'name BEGINSWITH $0', ['a']);
      realm.subscriptions.update((mutableSubscriptions) => mutableSubscriptions.add(query));
      print(realm.subscriptions.first.queryString);
      realm.syncSession.waitForDownload();
      // sub.cancel(); // no need for further progress notifications
      expect(realm.isClosed, false);
      expect(progress, greaterThanOrEqualTo(0));
      cleanUpRealm(realm, app);
  });


    test('Track download progress', () async {
      print("start");
      final credentials = Credentials.anonymous();
      final currentUser = await app.logIn(credentials);
      double progress = -1;
      final config = Configuration.flexibleSync(currentUser, [Tricycle.schema]);
      // :snippet-start: async-open-track-progress
      print(progress);

      final realm = await Realm.open(config, onProgressCallback: (syncProgress) {
            progress = syncProgress.progressEstimate;
            print("here");
            // Percent complete == progress * 100
          print(progress);
          if (syncProgress.progressEstimate == 1.0) {
             // Transfer is complete
          }
      });
          await realm.syncSession.waitForUpload();
              await realm.syncSession.waitForDownload();
      var foo = realm.syncSession.getProgressStream(ProgressDirection.download,ProgressMode.forCurrentlyOutstandingWork);

      // :snippet-end:
      /*expect(realm.isClosed, false);
      expect(progress, greaterThanOrEqualTo(0));
      cleanUpRealm(realm, app);*/
    });
    test('Cancel download in progress', () async {
      final credentials = Credentials.anonymous();
      final currentUser = await app.logIn(credentials);
      final config = Configuration.flexibleSync(currentUser, [Tricycle.schema]);
      // :snippet-start: async-open-cancel
      final token = CancellationToken();

      // Cancel the open operation after 30 seconds.
      // Alternatively, you could display a loading dialog and bind the cancellation
      // to a button the user can click to stop the wait.
      Future<void>.delayed(
          const Duration(seconds: 30),
          () => token.cancel(CancelledException(
              cancellationReason: "Realm took too long to open")));

      // If realm does not open after 30 seconds with asynchronous Realm.open(),
      // open realm immediately with Realm() and try to sync data in the background.
      late Realm realm;
      try {
        realm = await Realm.open(config, cancellationToken: token);
      } on CancelledException catch (err) {
        print(err.cancellationReason); // prints "Realm took too long to open"
        realm = Realm(config);
      }
      // :snippet-end:
      expect(token.isCancelled, false);
      cleanUpRealm(realm, app);
    });

    test("Handle Sync Error", () async {
      var handlerCalled = false;
      final carMakePrefix = generateRandomString(4);
      final credentials = Credentials.anonymous();
      final currentUser = await app.logIn(credentials);

      // :snippet-start: sync-error-handler
      final config = Configuration.flexibleSync(currentUser, [Car.schema],
          syncErrorHandler: (SyncError error) {
        handlerCalled = true; // :remove:
        print("Error message${error.message}");
      });

      final realm = Realm(config);
      // :snippet-end:

      // Create randomized query.
      final query = realm.query<Car>(r'make BEGINSWITH $0', [carMakePrefix]);

      // Set up subscription for randomized query.
      realm.subscriptions
          .update((mutableSubscriptions) => mutableSubscriptions.add(query));

      // Wait for subscriptions to sync with server.
      await realm.subscriptions.waitForSynchronization();

      final carId = ObjectId();

      // Add new object that doesn't match the randomized subscription.
      // Should cause an error.
      realm.write(() => realm.add(Car(carId, "doesn't match subscription")));

      // Wait for write to upload and generate error.
      await realm.syncSession.waitForUpload();

      expect(handlerCalled, true);

      await cleanUpRealm(realm, app);
      expect(realm.isClosed, true);
      expect(app.currentUser, null);
    });

    test("Handle Compensating Write Error", () async {
      late SyncError testCompensatingWriteError;
      final carMakePrefix = generateRandomString(4);
      final credentials = Credentials.anonymous();
      final currentUser = await app.logIn(credentials);

      // :snippet-start: handle-compensating-write-error
      void handleCompensatingWrite(
          CompensatingWriteError compensatingWriteError) {
        testCompensatingWriteError = compensatingWriteError; // :remove:
        final writeReason = compensatingWriteError.compensatingWrites!.first;

        print("Error message: ${writeReason.reason}");
        // ... handle compensating write error as needed.
      }

      final config = Configuration.flexibleSync(currentUser, [Car.schema],
          syncErrorHandler: (syncError) {
        if (syncError is CompensatingWriteError) {
          handleCompensatingWrite(syncError);
        }
      });

      final realm = Realm(config);
      // :snippet-end:

      // Create randomized query.
      final query = realm.query<Car>(r'make BEGINSWITH $0', [carMakePrefix]);

      // Set up subscription for randomized query.
      realm.subscriptions
          .update((mutableSubscriptions) => mutableSubscriptions.add(query));

      // Wait for subscriptions to sync with server.
      await realm.subscriptions.waitForSynchronization();

      final carId = ObjectId();

      // Add new object that doesn't match the randomized subscription.
      // Should cause an error.
      realm.write(() => realm.add(Car(carId, "doesn't match subscription")));

      // Wait for write to upload and generate error.
      await realm.syncSession.waitForUpload();

      expect(testCompensatingWriteError, isA<CompensatingWriteError>());

      final sessionError = testCompensatingWriteError as CompensatingWriteError;

      expect(sessionError.message,
          startsWith('Client attempted a write that is not allowed'));
      final writeReason = sessionError.compensatingWrites!.first;
      expect(writeReason, isNotNull);
      expect(writeReason.objectType, "Car");
      expect(writeReason.reason,
          'write to ObjectID("$carId") in table "${writeReason.objectType}" not allowed; object is outside of the current query view');
      expect(writeReason.primaryKey.value, carId);

      await cleanUpRealm(realm, app);
      expect(realm.isClosed, true);
      expect(app.currentUser, null);
    });
  });
}
