const smallCircle = {
  center: [-121.9, 47.3],
  // The GeoCircle radius is measured in radians
  distance: 0.004363323,
};

const largeCircleCenter = {
  longitude: -122.6,
  latitude: 47.8,
};

// Realm provides `kmToRadians` and `miToRadians`
// to convert these measurements. Import the relevant
// convenience method for your app's needs.
const radiusFromKm = kmToRadians(44.4);

const largeCircle = {
  center: largeCircleCenter,
  distance: radiusFromKm,
};
