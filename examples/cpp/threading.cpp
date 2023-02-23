#include <catch2/catch_test_macros.hpp>
#include <string>
#include "testHelpers.hpp"
#include <cpprealm/sdk.hpp>

struct Item : realm::object<Item> {
    realm::persisted<std::string> name;

    static constexpr auto schema = realm::schema("Threading_Item",
        realm::property<&Item::name>("name")
    );
};

TEST_CASE("thread safe reference", "[write]") {
    auto realm = realm::open<Item>();

    auto item = Item {
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
    auto threadSafeItem = realm::thread_safe_reference<Item>{item};
    
    // Move the thread safe reference to a background thread
    auto thread = std::thread([threadSafeItem = std::move(threadSafeItem)]() mutable {
        // Open the realm again on the background thread
        auto realm = realm::open<Item>();
        
        // Resolve the Item instance via the thread safe reference
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
    // :uncomment-start:
    // int main() {
    // :uncomment-end:
        // Set up a custom scheduler
        auto scheduler = realm::NoPlatformScheduler::make();
        
        // Pass the scheduler instance to the realm configuration
        auto config = realm::db_config{
            std::nullopt, scheduler
        };
        
        // Start the program main loop
        auto done = false;
        while (!done) {
            // As long as scheduler is in scope, looper is active
            // and automatically processing events on a background thread.
            
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
