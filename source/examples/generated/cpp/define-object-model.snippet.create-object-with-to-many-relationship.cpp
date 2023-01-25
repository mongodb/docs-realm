auto realm = realm::open<Company, Employee>();

auto employee1 = Employee {
    .firstName = "Pam",
    .lastName = "Beesly" };

auto employee2 = Employee {
    .firstName = "Jim",
    .lastName = "Halpert" };

auto company = Company {
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
