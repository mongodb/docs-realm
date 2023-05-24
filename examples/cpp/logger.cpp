#include <catch2/catch_test_macros.hpp>
#include <cpprealm/sdk.hpp>

struct LoggerDog : realm::object<LoggerDog> {
    realm::persisted<std::string> name;
    realm::persisted<int64_t> age;

    static constexpr auto schema = realm::schema("LoggerDog",
        realm::property<&LoggerDog::name>("name"),
        realm::property<&LoggerDog::age>("age"));
};

// :snippet-start: create-custom-logger
struct MyCustomLogger : realm::logger {
    void do_log(realm::logger::level level, const std::string &msg) override {
        std::cout << "Realm log entry: " << msg << "\n";
    }
};
// :snippet-end:

TEST_CASE("open a realm with a logger", "[realm][logger]") {
    // :snippet-start: initialize-logger
    auto logLevel = realm::logger::level::info;
    auto thisRealm = realm::open<LoggerDog>();
    auto myLogger = MyCustomLogger();
    realm::set_default_level_threshold(logLevel);
    //realm::set_default_logger(myLogger);
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
    }
}
