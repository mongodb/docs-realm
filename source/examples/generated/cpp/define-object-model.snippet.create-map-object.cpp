auto realm = realm::open<Employee>();

auto employee = Employee {
    ._id = 8675309,
    .firstName = "Tommy",
    .lastName = "Tutone"
};

employee.locationByDay = {
    { "Monday", Employee::WorkLocation::home },
    { "Tuesday", Employee::WorkLocation::office },
    { "Wednesday", Employee::WorkLocation::home },
    { "Thursday", Employee::WorkLocation::office }
};

realm.write([&realm, &employee] {
    realm.add(employee);
    employee.locationByDay["Friday"] = Employee::WorkLocation::home;
});
