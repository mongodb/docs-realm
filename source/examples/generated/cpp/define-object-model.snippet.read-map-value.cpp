auto employees = realm.objects<Employee>();
auto employeesNamedTommy = employees.where([](auto &employee) {
    return employee.firstName == "Tommy";
});
auto tommy = employeesNamedTommy[0];
// You can iterate through keys and values and do something with them
for (auto [k, v] : tommy.locationByDay) {
    if (k == "Monday") CHECK(v == Employee::WorkLocation::home);
    else if (k == "Tuesday") CHECK(v == Employee::WorkLocation::office);
}
// You can access values for keys like any other map type
auto mondayLocation = tommy.locationByDay["Monday"];
