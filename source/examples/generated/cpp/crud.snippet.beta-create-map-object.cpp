auto config = db_config();
auto realm = db(std::move(config));

auto dog = Employee {
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

realm.write([&] {
    realm.add(std::move(employee));
    employee.locationByDay["Friday"] = Employee::WorkLocation::HOME;
});
