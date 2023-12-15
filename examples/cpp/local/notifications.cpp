#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>
#include <string>

using namespace realm;

// :replace-start: {
//   "terms": {
//     "Beta_ToMany_": "",
//     "Beta_": ""
//   }
// }

struct Beta_Notification_Dog {
  std::string name;
  int64_t age;
};
REALM_SCHEMA(Beta_Notification_Dog, name, age)

struct Beta_Notification_Person {
  std::string _id;
  std::string name;
  int64_t age;
  Beta_Notification_Dog* dog;
};
REALM_SCHEMA(Beta_Notification_Person, _id, name, age, dog)

// :snippet-start: beta-collection-model
struct Beta_ToMany_Person {
  std::string name;
  std::vector<Beta_Notification_Dog*> dogs;
};
REALM_SCHEMA(Beta_ToMany_Person, name, dogs)
// :snippet-end:

TEST_CASE("object notification", "[notification]") {
  auto relative_realm_path_directory = "beta_notifications/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("notification_objects");
  path = path.replace_extension("realm");
  // :snippet-start: beta-object
  auto config = realm::db_config();
  config.set_path(path);  // :remove:
  auto realm = db(std::move(config));

  auto dog = Beta_Notification_Dog{.name = "Max"};

  // Create an object in the realm.
  realm.write([&] { realm.add(std::move(dog)); });

  auto dogs = realm.objects<Beta_Notification_Dog>();
  auto specificDog = dogs[0];
  //  Set up the listener & observe object notifications.
  auto token = specificDog.observe([&](auto&& change) {
    try {
      if (change.error) {
        rethrow_exception(change.error);
      }
      if (change.is_deleted) {
        std::cout << "The object was deleted.\n";
      } else {
        for (auto& propertyChange : change.property_changes) {
          std::cout << "The object's " << propertyChange.name
                    << " property has changed.\n";
          CHECK(propertyChange.name == "name");  // :remove:
          auto newPropertyValue =
              std::get<std::string>(*propertyChange.new_value);
          std::cout << "The new value is " << newPropertyValue << "\n";
          CHECK(newPropertyValue == "Wolfie");  // :remove:
        }
      }
    } catch (std::exception const& e) {
      std::cerr << "Error: " << e.what() << "\n";
    }
  });

  // Update the dog's name to see the effect.
  realm.write([&] { specificDog.name = "Wolfie"; });

  // Deleting the object triggers a delete notification.
  realm.write([&] { realm.remove(specificDog); });

  // Refresh the realm after the change to trigger the notification.
  realm.refresh();

  // :snippet-start: unregister
  // Unregister the token when done observing.
  token.unregister();
  // :snippet-end:
  // :snippet-end:
}

TEST_CASE("collection notification", "[notification]") {
  auto relative_realm_path_directory = "beta_notifications/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("notification_objects");
  path = path.replace_extension("realm");
  auto config = realm::db_config();
  config.set_path(path);
  auto realm = db(std::move(config));

  auto setupPerson = Beta_ToMany_Person{.name = "Dachary"};
  auto dog1 = Beta_Notification_Dog{.name = "Ben"};
  auto dog2 = Beta_Notification_Dog{.name = "Lita"};

  setupPerson.dogs.push_back(&dog1);

  // Create an object in the realm.
  realm.write([&] { realm.add(std::move(setupPerson)); });

  auto people = realm.objects<Beta_ToMany_Person>();
  auto person = people[0];
  // :snippet-start: beta-collection
  //  Set up the listener & observe a collection.
  auto token = person.dogs.observe([&](auto&& changes) {
    if (changes.collection_root_was_deleted) {
      std::cout << "The collection was deleted.\n";
    } else {
      // Handle deletions, then insertions, then modifications.
      for (auto& collectionChange : changes.deletions) {
        std::cout << "The object at index " << std::to_string(collectionChange)
                  << " was removed\n";
      }
      for (auto& collectionChange : changes.insertions) {
        std::cout << "The object at index " << std::to_string(collectionChange)
                  << " was inserted\n";
      }
      for (auto& collectionChange : changes.modifications) {
        std::cout << "The object at index " << std::to_string(collectionChange)
                  << " was modified\n";
      }
    }
  });

  // Remove an object from the collection, and then add an object to see
  // deletions and insertions.
  realm.write([&] {
    person.dogs.clear();
    person.dogs.push_back(&dog2);
  });

  // Modify an object to see a modification.
  realm.write([&] { dog2.age = 2; });

  // Refresh the realm after the change to trigger the notification.
  realm.refresh();

  // Unregister the token when done observing.
  token.unregister();
  // :snippet-end:
  // Clean up after the test
  auto dogs = realm.objects<Beta_Notification_Dog>();
  auto firstDog = dogs[0];
  realm.write([&] {
    realm.remove(firstDog);
    realm.remove(person);
  });
}

TEST_CASE("results notification", "[notification]") {
  auto relative_realm_path_directory = "beta_notifications/";
  std::filesystem::create_directories(relative_realm_path_directory);
  std::filesystem::path path =
      std::filesystem::current_path().append(relative_realm_path_directory);
  path = path.append("notification_objects");
  path = path.replace_extension("realm");
  auto config = realm::db_config();
  config.set_path(path);
  auto realm = db(std::move(config));

  auto dog1 = Beta_Notification_Dog{.name = "Max"};
  auto dog2 = Beta_Notification_Dog{.name = "Maui"};

  // Create an object in the realm.
  realm.write([&] { realm.add(std::move(dog1)); });

  // :snippet-start: beta-results
  // Get a results collection to observe
  auto dogs = realm.objects<Beta_Notification_Dog>();
  auto firstDog = dogs[0];  // :remove:
  //  Set up the listener & observe results notifications.
  auto token = dogs.observe([&](auto&& changes) {
    try {
      if (changes.collection_root_was_deleted) {
        std::cout << "The collection was deleted.\n";
      } else {
        // Handle deletions, then insertions, then modifications.
        for (auto& resultsChange : changes.deletions) {
          std::cout << "The object at index " << std::to_string(resultsChange)
                    << " was deleted\n";
        }
        for (auto& resultsChange : changes.insertions) {
          std::cout << "The object at index " << std::to_string(resultsChange)
                    << " was inserted\n";
        }
        for (auto& resultsChange : changes.modifications) {
          std::cout << "The object at index " << std::to_string(resultsChange)
                    << " was modified\n";
        }
      }
    } catch (std::exception const& e) {
      std::cerr << "Error: " << e.what() << "\n";
    }
  });

  // Delete and then add an object to see deletions and insertions.
  realm.write([&] {
    realm.remove(firstDog);
    realm.add(std::move(dog2));
  });

  // Modify an object to see a modification.
  realm.write([&] { dog2.age = 2; });

  // Refresh the realm after the change to trigger the notification.
  realm.refresh();

  // Unregister the token when done observing.
  token.unregister();
  // :snippet-end:
  auto mauiDog = dogs[0];
  // Clean up after the test
  realm.write([&] { realm.remove(mauiDog); });
}

// :replace-end:
