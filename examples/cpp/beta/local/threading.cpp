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
    auto thread = std::thread([threadSafeItem = std::move(threadSafeItem)]() mutable {
        // Open the realm again on the background thread
        auto config = realm::db_config();
        auto realm = db(std::move(config));
        
        // Resolve the ThreadingExample_Item instance via the thread safe reference
        auto item = realm.resolve(std::move(threadSafeItem));

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

// :replace-end:
