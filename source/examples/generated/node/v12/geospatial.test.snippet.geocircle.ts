const largeCircle: GeoCircle = {
  center: [-121.9, 47.3],
  distance: 0.25,
};

const circleCenterCoordinates: GeoPoint = [-122.6, 47.8];
const radius = kmToRadians(44.4);

const smallCircle: GeoCircle = {
  center: circleCenterCoordinates,
  distance: radius,
};
