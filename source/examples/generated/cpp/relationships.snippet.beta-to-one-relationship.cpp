struct FavoriteToy {
    primary_key<realm::uuid> _id;
    std::string name;
};
REALM_SCHEMA(FavoriteToy, _id, name)

struct Dog {
    primary_key<realm::uuid> _id;
    std::string name;
    int64_t age;
    
    // Define a relationship as a link to another Realm object
    link<FavoriteToy> favoriteToy;
};
REALM_SCHEMA(Dog, _id, name, age, favoriteToy)
