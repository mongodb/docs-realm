#include <catch2/catch_test_macros.hpp>
#include <future>
// :snippet-start: beta-includes
#include <cpprealm/sdk.hpp>
#include <cpprealm/experimental/sdk.hpp>

using namespace realm::experimental;
// :snippet-end:

// :replace-start: {
//   "terms": {
//     "Beta_Local_": "",
//     "Beta_Sync_": ""
//   }
// }

static const std::string APP_ID = "cpp-tester-uliix";

struct Beta_Local_Todo {
    primary_key<realm::object_id> _id{realm::object_id::generate()};
    std::string name;
    std::string status;
};
REALM_SCHEMA(Beta_Local_Todo, _id, name, status);

// :snippet-start: beta-model
struct Beta_Sync_Todo {
    primary_key<realm::object_id> _id{realm::object_id::generate()};
    std::string name;
    std::string status;
    // The ownerId property stores the user.identifier() of a
    // logged-in user. Omit this property for the non-sync example.
    std::string ownerId;
};
REALM_SCHEMA(Beta_Sync_Todo, _id, name, status, ownerId);
// :snippet-end:

TEST_CASE("local quick start", "[realm][write]") {
    auto relative_realm_path_directory = "beta_quick-start/";
    std::filesystem::create_directories(relative_realm_path_directory);
    std::filesystem::path path = std::filesystem::current_path().append(relative_realm_path_directory);
    path = path.append("project_and_item_objects");
    path = path.replace_extension("realm");
    // :snippet-start: beta-realm-open
    auto config = realm::db_config();
    config.set_path(path); // :remove:
    auto realm = db(std::move(config));
    // :snippet-end:

    // :snippet-start: beta-create-todo
    auto todo = Beta_Local_Todo {
        .name = "Create my first todo item",
        .status = "In Progress"
    };

    realm.write([&] {
        realm.add(std::move(todo));
    });
    // :snippet-end:

    auto todos = realm.objects<Beta_Local_Todo>();

    CHECK(todos.size() == 1);


    auto todosInProgress = todos.where([](auto const& todo) {
        return todo.status == "In Progress";
    });

    CHECK(todosInProgress.size() == 1);

    auto specificTodo = todos[0];
    auto token = specificTodo.observe([&](auto&& change) {
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

    // :snippet-start: beta-modify-write-block
    auto todoToUpdate = todosInProgress[0];
    realm.write([&] {
        todoToUpdate.status = "Complete";
    });
    // :snippet-end:
    CHECK(todoToUpdate.status == "Complete");

    // :snippet-start: beta-delete
    realm.write([&] {
        realm.remove(specificTodo);
    });
    // :snippet-end:
    token.unregister();
}

TEST_CASE("sync quick start", "[realm][write][sync][sync-logger]") {
    auto app = realm::App(APP_ID);
    auto logLevel = realm::logger::level::info;
    app.get_sync_manager().set_log_level(logLevel);
    // :snippet-start: beta-authenticate-user
    auto user = app.login(realm::App::credentials::anonymous()).get();
    // :snippet-end:
    // :snippet-start: beta-open-synced-realm
    auto syncConfig = user.flexible_sync_configuration();
    auto realm = db(syncConfig);
    // :remove-start:
    auto syncSession = realm.get_sync_session();
    syncSession->state();
    syncSession->wait_for_download_completion().get();
    realm.refresh();
    // Remove any existing subscriptions before adding the one for this example
    auto clearInitialSubscriptions = realm.subscriptions().update([](auto &subs) {
        subs.clear();
    }).get();
    CHECK(clearInitialSubscriptions == true);
    CHECK(realm.subscriptions().size() == 0);
    // :remove-end:
    // For this example, get the userId for the Flexible Sync query
    auto userId = user.identifier();
    auto subscriptions = realm.subscriptions();
    auto updateSubscriptionSuccess = subscriptions.update([&](realm::mutable_sync_subscription_set &subs) {
        subs.add<Beta_Sync_Todo>("todos", [&userId](auto &obj) {
            // For this example, get only Sync_Todo items where the ownerId
            // property value is equal to the userId of the logged-in user.
            return obj.ownerId == userId;
        });
    }).get();
    // :snippet-end:
    CHECK(updateSubscriptionSuccess == true);
    
    // :snippet-start: beta-write-to-synced-realm
    auto todo = Beta_Sync_Todo {
        .name = "Create a Sync todo item",
        .status = "In Progress",
        .ownerId = userId
    };

    realm.write([&] {
        realm.add(std::move(todo));
    });

    auto todos = realm.objects<Beta_Sync_Todo>();
    // :snippet-end:
    CHECK(todos.size() == 1);
    auto specificTodo = todos[0];
    realm.write([&] {
        realm.remove(specificTodo);
    });

    syncSession->wait_for_upload_completion().get();

}

// :replace-end:
