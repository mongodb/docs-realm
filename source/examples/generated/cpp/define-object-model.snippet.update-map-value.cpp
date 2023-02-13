// You can check that a key exists using `find`
auto findTuesday = tommy.locationByDay.find("Tuesday");
if (findTuesday != tommy.locationByDay.end())
    realm.write([&realm, &tommy] {
        tommy.locationByDay["Tuesday"] = Employee::WorkLocation::home;
    });
;
