const smallCircle: GeoCircle = {
  center: [-121.9, 47.3],
  distance: 0.25,
};

const largeCircleCenter: GeoPoint = {
  latitude: 47.8,
  longitude: -122.6,
};

const radius = kmToRadians(44.4);

const largeCircle: GeoCircle = {
  center: largeCircleCenter,
  distance: radius,
};
