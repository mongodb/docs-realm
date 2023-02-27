// :replace-start: {
//   "terms": {
//     "ThreadingExample_": ""
//   }
// }
#include <catch2/catch_test_macros.hpp>
#include <string>
#include <thread>
#include "testHelpers.hpp"
#include <cpprealm/sdk.hpp>

struct ThreadingExample_Item : realm::object<ThreadingExample_Item> {
    realm::persisted<std::string> name;

    static constexpr auto schema = realm::schema("ThreadingExample_Item",
        realm::property<&ThreadingExample_Item::name>("name")
    );
};

TEST_CASE("thread safe reference", "[write]") {
    auto realm = realm::open<ThreadingExample_Item>();

    auto item = ThreadingExample_Item {
        .name = "Save the cheerleader",
    };

    realm.write([&item, &realm] {
        realm.add(item);
    });
    
    // :snippet-start: refresh
    realm.refresh();
    // :snippet-end:

    // :snippet-start: thread-safe-reference
    // Put an object instance into a thread safe reference
    auto threadSafeItem = realm::thread_safe_reference<ThreadingExample_Item>{item};
    
    // Move the thread safe reference to a background thread
    auto thread = std::thread([threadSafeItem = std::move(threadSafeItem)]() mutable {
        // Open the realm again on the background thread
        auto realm = realm::open<ThreadingExample_Item>();
        
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
    
    // :snippet-start: scheduler
    struct MyScheduler : realm::scheduler {
        MyScheduler() {
            // ... Kick off task processor thread(s) and run until the scheduler
            // goes out of scope ...
        }

        ~MyScheduler() override {
            // ... Call in the processor thread(s) and block until return ...
        }
        
        void invoke(std::function<void()> &&task) override {
            // ... Add the task to the (lock-free) processor queue ...
        }

        [[nodiscard]] bool is_on_thread() const noexcept override {
            // ... Return true if the caller is on the same thread as a processor thread ...
        }

        bool is_same_as(const realm::scheduler *other) const noexcept override {
            // ... Compare scheduler instances ...
        }

        [[nodiscard]] bool can_invoke() const noexcept override {
            // ... Return true if the scheduler can accept tasks ...
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
            std::nullopt, scheduler
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

