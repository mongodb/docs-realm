struct Person {
    primary_key<int64_t> _id;
    std::string name;
    int64_t age;
    
    realm::experimental::link<Dog> dog;
};
REALM_SCHEMA(Person, _id, name, age, dog)
