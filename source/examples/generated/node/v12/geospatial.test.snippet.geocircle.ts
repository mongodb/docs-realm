const circle1: GeoCircle = {
  center: [-121.9, 47.3],
  distance: 0.25,
};

const circle2Center: GeoPoint = {
  longitude: -122.6,
  latitude: 47.8,
};

// `kmToRadians` is imported from Realm
const radius = kmToRadians(44.4);

const circle2: GeoCircle = {
  center: circle2Center,
  distance: radius,
};
