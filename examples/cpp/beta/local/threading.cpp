// :replace-start: {
//   "terms": {
//     "Beta_ThreadingExample_": ""
//   }
// }
#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>
#include <cpprealm/experimental/sdk.hpp>

using namespace realm::experimental;

struct Beta_ThreadingExample_Item {
    std::string name;
};
REALM_SCHEMA(Beta_ThreadingExample_Item, name)

TEST_CASE("thread safe reference", "[write]") {
    auto relative_realm_path_directory = "beta_tsr/";
    std::filesystem::create_directories(relative_realm_path_directory);
    std::filesystem::path path = std::filesystem::current_path().append(relative_realm_path_directory);
    path = path.append("tsr_objects");
    path = path.replace_extension("realm");
    
    auto config = realm::db_config();
    config.set_path(path);
    auto realm = db(std::move(config));

    auto item = Beta_ThreadingExample_Item {
        .name = "Save the cheerleader",
    };

    realm.write([&] {
        realm.add(std::move(item));
    });
    
    realm.refresh();

    auto managedItems = realm.objects<Beta_ThreadingExample_Item>();
    auto managedItem = managedItems[0];
    
    // :snippet-start: beta-thread-safe-reference
    // Put a managed realm object into a thread safe reference
    auto threadSafeItem = realm::thread_safe_reference<Beta_ThreadingExample_Item>{managedItem};
    
    // Move the thread safe reference to a background thread
    auto thread = std::thread([threadSafeItem = std::move(threadSafeItem), path]() mutable {
        // Open the realm again on the background thread
        auto backgroundConfig = realm::db_config();
        backgroundConfig.set_path(path);
        auto backgroundRealm = db(std::move(backgroundConfig));
        
        // Resolve the ThreadingExample_Item instance via the thread safe reference
        auto item = backgroundRealm.resolve(std::move(threadSafeItem));

        // ... use item ...
    });

    // Wait for thread to complete
    thread.join();
    // :snippet-end:
}

TEST_CASE("scheduler", "[write]") {
    auto shouldQuitProgram = true;
    
    auto relative_realm_path_directory = "beta_scheduler/";
    std::filesystem::create_directories(relative_realm_path_directory);
    std::filesystem::path path = std::filesystem::current_path().append(relative_realm_path_directory);
    path = path.append("scheduler");
    path = path.replace_extension("realm");
    
    // :snippet-start: beta-scheduler
    struct MyScheduler : realm::scheduler {
        MyScheduler() {
            // ... Kick off task processor thread(s) and run until the scheduler
            // goes out of scope ...
        }

        ~MyScheduler() override {
            // ... Call in the processor thread(s) and block until return ...
        }
        
        void invoke(realm::Function<void()> &&task) override {
            // ... Add the task to the (lock-free) processor queue ...
        }

        [[nodiscard]] bool is_on_thread() const noexcept override {
            // ... Return true if the caller is on the same thread as a processor thread ...
            return false; // :remove:
        }

        bool is_same_as(const realm::scheduler *other) const noexcept override {
            // ... Compare scheduler instances ...
            return false; // :remove:
        }

        [[nodiscard]] bool can_invoke() const noexcept override {
            // ... Return true if the scheduler can accept tasks ...
            return false; // :remove:
        }
        // ...
    };

    // :uncomment-start:
    // int main() {
    // :uncomment-end:
        // Set up a custom scheduler
        auto scheduler = std::make_shared<MyScheduler>();
        
        // Pass the scheduler instance to the realm configuration
        auto config = realm::db_config{
            path, scheduler
        };
        
        // Start the program main loop
        auto done = false;
        while (!done) {
            // This assumes the scheduler is implemented so that it
            // continues processing tasks on background threads until
            // the scheduler goes out of scope.
            
            // Handle input here
            // ...
            if (shouldQuitProgram) {
                done = true;
            }
        }
    // :uncomment-start:
    // }
    // :uncomment-end:
    // :snippet-end:
}

TEST_CASE("test freeze", "[write]") {
    auto relative_realm_path_directory = "beta_freeze/";
    std::filesystem::create_directories(relative_realm_path_directory);
    std::filesystem::path path = std::filesystem::current_path().append(relative_realm_path_directory);
    path = path.append("frozen_objects");
    path = path.replace_extension("realm");
    
    auto config = realm::db_config();
    config.set_path(path);
    
    // :snippet-start: freeze
    auto realm = db(std::move(config));

    // :remove-start:
    auto item = Beta_ThreadingExample_Item {
        .name = "Save the cheerleader",
    };

    realm.write([&] {
        realm.add(std::move(item));
    });
    // :remove-end:
    // Get an immutable copy of the realm that can be passed across threads
    auto frozenRealm = realm.freeze();
    
    // :snippet-start: is-frozen
    CHECK(frozenRealm.is_frozen()); // :remove:
    if (frozenRealm.is_frozen()) {
        // Do something with the frozen realm.
        // You may pass a frozen realm, collection, or objects
        // across threads. Or you may need to `.thaw()`
        // to make it mutable again.
    }
    // :snippet-end:

    // You can freeze collections
    auto managedItems = realm.objects<Beta_ThreadingExample_Item>();
    auto frozenItems = managedItems.freeze();
    
    CHECK(frozenItems.is_frozen());
    
    // You can read from frozen realms
    auto itemsFromFrozenRealm = frozenRealm.objects<Beta_ThreadingExample_Item>();
    
    CHECK(itemsFromFrozenRealm.is_frozen());
    
    // You can freeze objects
    auto managedItem = managedItems[0];
    
    CHECK(!managedItem.m_realm.is_frozen());
    
    auto frozenItem = managedItem.freeze();
    
    CHECK(frozenItem.is_frozen());
    
    // Frozen objects have a reference to a frozen realm
    CHECK(frozenItem.m_realm.is_frozen());
    // :snippet-end:
    
    realm.write([&] {
        realm.remove(managedItem);
    });
}

TEST_CASE("test thaw", "[write]") {
    auto relative_realm_path_directory = "beta_thaw/";
    std::filesystem::create_directories(relative_realm_path_directory);
    std::filesystem::path path = std::filesystem::current_path().append(relative_realm_path_directory);
    path = path.append("thaw_test_objects");
    path = path.replace_extension("realm");
    
    auto config = realm::db_config();
    config.set_path(path);
    auto realm = db(std::move(config));
    auto item = Beta_ThreadingExample_Item {
        .name = "Save the cheerleader",
    };

    realm.write([&] {
        realm.add(std::move(item));
    });

    auto frozenRealm = realm.freeze();
    
    CHECK(frozenRealm.is_frozen());

    // :snippet-start: thaw
    // Read from a frozen realm
    auto frozenItems = frozenRealm.objects<Beta_ThreadingExample_Item>();
    
    // The collection that we pull from the frozen realm is also frozen
    CHECK(frozenItems.is_frozen());
    
    // :remove-start:
    // Removing this part of the example as it's waiting for
    // .thaw() to be exposed on an object
    // Get an individual item from the collection
    auto frozenItem = frozenItems[0];
    
    // To modify the item, you must first thaw it
    // You can also thaw collections and realms
    // This won't compile with the error 'No member named 'thaw' in 'realm::experimental::managed<Beta_ThreadingExample_Item>''
    //auto thawedItem = frozenItem.thaw();
    // :remove-end:
    // To modify objects, you must first thaw them.
    // Currently, you can thaw collections or realms.
    auto thawedItems = frozenItems.thaw();
    
    auto thawedItem = thawedItems[0];
    
    // Check to make sure the item is valid. An object is
    // invalidated when it is deleted from its managing realm,
    // or when its managing realm has invalidate() called on it.
    REQUIRE(thawedItem.is_invalidated() == false);
    
    // :snippet-end:
    // Ending the snippet here because I'm getting issues with what
    // I'm trying to do below. I'll update after the `.thaw()`
    // PR that adds a realm getter and use that method to retrieve
    // the managing realm and write to it.
    SKIP();
    auto thawedRealm = frozenRealm.thaw();
    
    thawedRealm.write([&] {
        thawedItem.name = "Save the world";
    });
    REQUIRE(thawedItem.name == "Save the world");
    
    thawedRealm.write([&] {
        thawedRealm.remove(thawedItem);
    });
}
// :replace-end:
