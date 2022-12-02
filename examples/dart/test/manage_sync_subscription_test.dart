import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import './utils.dart';

part 'manage_sync_subscription_test.g.dart';

@RealmModel()
class _Plane {
  @PrimaryKey()
  @MapTo('_id')
  late int id;

  late String name;
  late int numSeats;
}

@RealmModel()
class _Train {
  @PrimaryKey()
  @MapTo('_id')
  late int id;

  late String name;
  late int numCars;
}

@RealmModel()
class _Boat {
  @PrimaryKey()
  @MapTo('_id')
  late int id;

  late String name;
  late int tonnage;
}

late App app;
late Realm realm;
late User currentUser;
const APP_ID = "flutter-flexible-luccm";
void main() {
  group('Manage sync subscriptions', () {
    setUpAll(() async {
      final appConfig = AppConfiguration(APP_ID);
      app = App(appConfig);
      final credentials =
          Credentials.emailPassword("lisa@example.com", "abc123");
      currentUser = await app.logIn(credentials);
    });
    tearDownAll(() async {
      await app.currentUser?.logOut();
    });
    setUp(() async {
      final config = Configuration.flexibleSync(
        currentUser,
        [Plane.schema, Train.schema, Boat.schema],
        path: 'flex-${generateRandomString(10)}.realm',
      );
      realm = Realm(config);
      await realm.subscriptions.waitForSynchronization();
      final planeQuery = realm.all<Plane>();
      final longTrainQuery = realm.all<Train>().query("numCars >= 4");
      realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
        mutableSubscriptions.add(planeQuery, name: "all-planes");
        mutableSubscriptions.add(longTrainQuery, name: 'long-trains');
      });
      await realm.subscriptions.waitForSynchronization();
    });
    tearDown(() async {
      realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
        mutableSubscriptions.clear();
      });
      await realm.subscriptions.waitForSynchronization();
      realm.close();
      await Future.delayed(Duration(milliseconds: 300));
      Realm.deleteRealm(realm.config.path);
    });
    test('Add query to subscription set', () async {
      // :snippet-start: add-subscription
      final planeQuery = realm.all<Plane>();
      final longTrainQuery = realm.query<Train>("numCars >= 5");
      realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
        mutableSubscriptions.add(planeQuery, name: "planes");
        mutableSubscriptions.add(longTrainQuery,
            name: 'long-trains', update: true);
      });
      await realm.subscriptions.waitForSynchronization();
      // :snippet-end:
      expect(realm.subscriptions.length, 3);
    });
    test('Get subscriptions', () async {
      // :snippet-start: get-subscriptions
      final subscriptions = realm.subscriptions;
      // :snippet-end:
      expect(subscriptions.length, 2);
    });
    test('Wait for subscription changes to sync', () async {
      // :snippet-start: wait-for-subscription-change
      await realm.subscriptions.waitForSynchronization();
      // :snippet-end:
      expect(realm.subscriptions.state, SubscriptionSetState.complete);
    });

    test('Update subscriptions with new query', () async {
      // :snippet-start: update-subscriptions-new-query
      final longerTrainQuery = realm.query<Train>("numCars > 10");

      realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
        mutableSubscriptions.add(longerTrainQuery,
            name: 'long-trains', update: true);
      });
      // :snippet-end:
      expect(realm.subscriptions.findByName('long-trains')?.queryString.trim(),
          "numCars > 10");
    });
    test('Remove subscription by query', () async {
      // :snippet-start: remove-subscriptions-by-query
      realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
        mutableSubscriptions.removeByQuery(realm.all<Plane>());
      });
      // :snippet-end:
      // expect(realm.subscriptions.length, 1);
    });
    test('Remove subscription by name', () async {
      // :snippet-start: remove-subscriptions-by-name
      realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
        mutableSubscriptions.removeByName('long-trains');
      });
      // :snippet-end:
      expect(realm.subscriptions.length, 1);
    });
    test('Remove all subscriptions by reference', () async {
      // :snippet-start: remove-subscriptions-by-reference
      final sub = realm.subscriptions[0];
      realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
        mutableSubscriptions.remove(sub);
      });
      // :snippet-end:
      expect(realm.subscriptions.length, 1);
    });
    test('Remove all subscriptions by object type', () async {
      // :snippet-start: remove-subscriptions-by-object-type
      realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
        mutableSubscriptions.removeByType<Train>();
      });
      // :snippet-end:
      expect(realm.subscriptions.length, 1);
    });
    test('Remove all subscriptions', () async {
      // :snippet-start: remove-all-subscriptions
      realm.subscriptions.update((MutableSubscriptionSet mutableSubscriptions) {
        mutableSubscriptions.clear();
      });
      // :snippet-end:
      expect(realm.subscriptions, isEmpty);
    });
  });
}
