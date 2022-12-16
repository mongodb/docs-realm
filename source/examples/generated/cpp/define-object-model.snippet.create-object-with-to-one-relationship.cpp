auto realm = realm::open<PointOfInterest, GPSCoordinates>();

auto gpsCoordinates = GPSCoordinates { .latitude = 36.0554, .longitude = 112.1401 };
auto pointOfInterest = PointOfInterest { .name = "Grand Canyon Village" };
pointOfInterest.gpsCoordinates = gpsCoordinates;

realm.write([&realm, &pointOfInterest] {
    realm.add(pointOfInterest);
});
