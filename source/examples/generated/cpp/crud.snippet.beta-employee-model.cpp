struct Employee {
    primary_key<int64_t> _id;
    std::string firstName;
    std::string lastName;
    
    // You can use this property as you would any other member
    // Omitting it from the schema means Realm ignores it
    std::string jobTitle_notPersisted;
    
    link<Dog> dog;
};
// The REALM_SCHEMA omits the `jobTitle_notPersisted` property
// Realm does not store and cannot retrieve a value for this property
REALM_SCHEMA(Employee, _id, firstName, lastName)
