HauntedHouse house = realm.where(HauntedHouse.class)
        .findFirst();
realm.executeTransaction(r -> {
    Log.v("EXAMPLE", "Number of ghosts: " + house.ghosts.get()); // 0
    house.ghosts.increment(1); // 1
    house.ghosts.increment(5); // 6
    house.ghosts.decrement(2); // 4
});
