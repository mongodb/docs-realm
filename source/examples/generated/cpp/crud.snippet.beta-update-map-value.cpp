// You can check that a key exists using `find`
auto findTuesday = tommy.locationByDay.find("Tuesday");
if (findTuesday != tommy.locationByDay.end())
    realm.write([&] {
        tommy.locationByDay["Tuesday"] = Employee::WorkLocation::HOME;
    });
;
