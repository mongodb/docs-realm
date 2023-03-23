realm.write([&realm, &tommy] {
    tommy.locationByDay.erase("Tuesday");
});
