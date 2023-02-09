#include <catch2/catch_test_macros.hpp>
//#include <string>
#include <thread>
#include <future>
#include <string>
#include <unistd.h>
// :snippet-start: includes
#include <cpprealm/sdk.hpp>
// :snippet-end:

// :replace-start: {
//   "terms": {
//     "Local_": "",
//     "Sync_": "",
//     "charUserId": "userId"
//   }
// }

static const std::string APP_ID = "cpp-tester-uliix";

struct Local_Todo : realm::object<Local_Todo> {
    realm::persisted<std::string> name;
    realm::persisted<std::string> status;

    static constexpr auto schema = realm::schema("Local_Todo",
        realm::property<&Local_Todo::name>("name"),
        realm::property<&Local_Todo::status>("status"));
};

// :snippet-start: model
struct Sync_Todo : realm::object<Sync_Todo> {
    realm::persisted<realm::object_id> _id{realm::object_id::generate()};
    realm::persisted<std::string> name;
    realm::persisted<std::string> status;
    // The ownerId property stores the user.identifier() of a
    // logged-in user. Omit this property for the non-sync example.
    realm::persisted<std::string> ownerId;

    static constexpr auto schema = realm::schema("Sync_Todo",
        realm::property<&Sync_Todo::_id, true>("_id"),
        realm::property<&Sync_Todo::name>("name"),
        realm::property<&Sync_Todo::status>("status"),
        realm::property<&Sync_Todo::ownerId>("ownerId"));
};
// :snippet-end:

TEST_CASE("local quick start", "[realm][write]") {
    // :snippet-start: realm-open
    auto realm = realm::open<Local_Todo>();
    // :snippet-end:

    // :snippet-start: create-todo
    auto todo = Local_Todo {
        .name = "Create my first todo item",
        .status = "In Progress"
    };

    realm.write([&realm, &todo] {
        realm.add(todo);
    });
    // :snippet-end:

    // :snippet-start: get-all-todos
    auto todos = realm.objects<Local_Todo>();
    // :snippet-end:
    CHECK(todos.size() == 1);

    // :snippet-start: filter
    auto todosInProgress = todos.where([](auto const& todo) {
        return todo.status == "In Progress";
    });
    // :snippet-end:
    CHECK(todosInProgress.size() == 1);

    // :snippet-start: watch-for-changes
    auto token = todo.observe([&](auto&& change) {
        try {
            if (change.error) {
                rethrow_exception(change.error);
            }
            if (change.is_deleted) {
                std::cout << "The object was deleted.\n";
            } else {
                for (auto& propertyChange : change.property_changes) {
                    std::cout << "The object's " << propertyChange.name << " property has changed.\n";
                    CHECK(propertyChange.name == "status"); // :remove:
                }
            }
        } catch (std::exception const& e) {
            std::cerr << "Error: " << e.what() << "\n";
        }
    });
    // :snippet-end:

    // :snippet-start: modify-write-block
    auto todoToUpdate = todosInProgress[0];
    realm.write([&realm, &todoToUpdate] {
        todoToUpdate.status = "Complete";
    });
    // :snippet-end:
    CHECK(*todoToUpdate.status == "Complete");

    // :snippet-start: delete
    realm.write([&realm, &todo] {
        realm.remove(todo);
    });
    // :snippet-end:
}

TEST_CASE("sync quick start", "[realm][write][sync]") {
    // :snippet-start: connect-to-backend
    auto app = realm::App(APP_ID);
    // :snippet-end:
    
    // :snippet-start: authenticate-user
    auto user = app.login(realm::App::credentials::anonymous()).get_future().get();
    // :snippet-end:
    
    // :snippet-start: open-synced-realm
    auto sync_config = user.flexible_sync_configuration();
    auto synced_realm_ref = realm::async_open<Sync_Todo>(sync_config).get_future().get();
    auto realm = synced_realm_ref.resolve();
    // :remove-start:
    // Remove any existing subscriptions before adding the one for this example
    auto clearInitialSubscriptions = realm.subscriptions().update([](realm::mutable_sync_subscription_set &subs) {
        subs.clear();
    }).get_future().get();
    CHECK(clearInitialSubscriptions == true);
    CHECK(realm.subscriptions().size() == 0);
    // :remove-end:
    // For this example, get the userId for the Flexible Sync query
    auto userId = user.identifier();
    auto subscriptions = realm.subscriptions();
    auto updateSubscriptionSuccess = subscriptions.update([&](realm::mutable_sync_subscription_set &subs) {
        subs.add<Sync_Todo>("todos", [&userId](auto &obj) {
            // For this example, get only Sync_Todo items where the ownerId
            // property value is equal to the userId of the logged-in user.
            return obj.ownerId == userId;
        });
    }).get_future().get();
    // :snippet-end:
    CHECK(updateSubscriptionSuccess == true);
    
    // The C++ SDK is currently missing a constructor to store a std::string
    // So convert the userId std::string to a character array for persisting.
    // TODO: Remove this and use the userId directly when the constructor is added.
    char* charUserId = strcpy(new char[userId.length() + 1], userId.c_str());
    
    // :snippet-start: write-to-synced-realm
    auto todo = Sync_Todo {
        .name = "Create a Sync todo item",
        .status = "In Progress",
        .ownerId = charUserId
    };

    realm.write([&realm, &todo] {
        realm.add(todo);
    });

    auto todos = realm.objects<Sync_Todo>();
    // :snippet-end:
    CHECK(todos.size() == 1);
    
    // The C++ SDK does not yet expose `waitForUpload` and `waitForDownload`
    // so add a delay to prevent the connection from terminating while syncing
    sleep(5);
    realm.write([&realm, &todo] {
        realm.remove(todo);
    });
    sleep(5);
}

// :replace-end:
