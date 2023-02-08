auto realm = realm::open<Company, Employee>();

auto employee1 = Employee {
    ._id = 23456,
    .firstName = "Pam",
    .lastName = "Beesly" };

auto employee2 = Employee {
    ._id = 34567,
    .firstName = "Jim",
    .lastName = "Halpert" };

auto company = Company {
    ._id = 45678,
    .name = "Dunder Mifflin"
};

// Use the `push_back` member function available to the 
// `ListObjectPersistable<T>` template to append `Employee` objects to
// the `Company` `employees` list property. 
company.employees.push_back(employee1);
company.employees.push_back(employee2);

realm.write([&realm, &company] {
    realm.add(company);
});
