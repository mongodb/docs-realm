// Define your models like regular structs.
struct Dog : realm::object {
    realm::persisted<std::string> name;
    realm::persisted<int> age;

    using schema = realm::schema<"Dog",
        realm::property<"name", &Dog::name>,
        realm::property<"age", &Dog::age>
    >;
};

struct Person : realm::object {
    realm::persisted<std::string> _id;
    realm::persisted<std::string> name;
    realm::persisted<int> age;

    // Create relationships by pointing an Object field to another Class
    realm::persisted<std::optional<Dog>> dog;

    using schema = realm::schema<"Person",
        realm::property<"_id", &Person::_id, true>, // primary key
        realm::property<"name", &Person::name>,
        realm::property<"age", &Person::age>,
        realm::property<"dog", &Person::dog>
    >;
};
