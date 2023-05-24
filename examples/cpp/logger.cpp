#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>

struct LoggerDog : realm::object<LoggerDog> {
    realm::persisted<std::string> name;
    realm::persisted<int64_t> age;

    static constexpr auto schema = realm::schema("LoggerDog",
        realm::property<&LoggerDog::name>("name"),
        realm::property<&LoggerDog::age>("age"));
};

std::atomic<int> custom_logger_counter; 

// :snippet-start: create-custom-logger
struct MyCustomLogger : realm::logger {
    // This could be called from any thread, so may not output visibly to the console.
    // Handle output in a queue or other cross-thread context if needed.
    void do_log(realm::logger::level level, const std::string &msg) override {
        std::cout << "Realm log entry: " << msg << std::endl;
        custom_logger_counter.fetch_add(1); // :remove:
    }
};
// :snippet-end:

TEST_CASE("open a realm with a logger", "[realm][logger]") {
    custom_logger_counter = 0;
    // :snippet-start: initialize-logger
    auto thisRealm = realm::open<LoggerDog>();
    auto myLogger = std::make_shared<MyCustomLogger>();
    realm::set_default_logger(myLogger);
    // :snippet-end:
    // :snippet-start: set-default-log-level
    auto logLevel = realm::logger::level::info;
    realm::set_default_level_threshold(logLevel);
    // :snippet-end:
    SECTION("Test code example functions as intended + teardown") {
        // Write something to the realm to confirm this worked as expected.
        auto dog = LoggerDog { .name = "Ben", .age = 2 };
        thisRealm.write([&thisRealm, &dog] { 
            thisRealm.add(dog); 
        });
        auto dogs = thisRealm.objects<LoggerDog>();
        auto dog_count = dogs.size();
        std::cout << "Dog count: " << dog_count << "\n";
        REQUIRE(dog_count >= 1);
        // Clean up after test
        thisRealm.write([&thisRealm, &dog] { 
            thisRealm.remove(dog); 
        });
        std::cout << "Atomic int counter is: " << custom_logger_counter.load() << "\n";
        //REQUIRE(x >= 1);
    }
}
