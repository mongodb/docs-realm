auto realm = realm::open<Employee>();

auto employee = Employee {
    ._id = 8675309,
    .firstName = "Tommy",
    .lastName = "Tutone"
};

employee.locationByDay = {
    { "Monday", Employee::WorkLocation::HOME },
    { "Tuesday", Employee::WorkLocation::OFFICE },
    { "Wednesday", Employee::WorkLocation::HOME },
    { "Thursday", Employee::WorkLocation::OFFICE }
};

realm.write([&realm, &employee] {
    realm.add(employee);
    employee.locationByDay["Friday"] = Employee::WorkLocation::HOME;
});
