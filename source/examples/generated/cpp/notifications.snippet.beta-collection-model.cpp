struct Person {
    std::string name;
    std::vector<Notification_Dog*> dogs;
};
REALM_SCHEMA(Person, name, dogs)
