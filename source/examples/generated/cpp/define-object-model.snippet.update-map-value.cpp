auto tuesdayLocation = tommy.locationByDay["Tuesday"];
CHECK(tuesdayLocation == Employee::WorkLocation::office);
realm.write([&realm, &tommy] {
    tommy.locationByDay["Tuesday"] = Employee::WorkLocation::home;
});
CHECK(tuesdayLocation == Employee::WorkLocation::home);
