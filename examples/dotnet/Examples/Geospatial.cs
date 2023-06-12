using System;
using Realms;
using System.Collections.Generic;
using System.Security.Cryptography;

namespace Examples
{
    public class Geospatial
    {
        public Geospatial()
        {
            var circle = new GeoCirce((23.459, 49.983), Distance.FromKilometers(10));

            // Above example uses implicit conversion from a tuple to GeoPoint, you can also use the explicit one
            var circle = new GeoCircle(new GeoPoint(latitude: 23.459, longitude: 49.983), Distance.FromKilometers(10));

            // Construct a polygon from a collection of points. First and last one need to be the same
            // in order to close the polygon.
            var polygon = new GeoPolygon((10, 10), (10, 20), (0, 20), (10, 10));

            // Construct a polygon with holes
            var outerRing = new GeoPoint[] { (10, 10), (10, 20), (0, 20), (10, 10));
            var hole1 = new GeoPoint[] { (1, 1), (1, 2), (0, 2), (1, 1));
            var hole2 = new GeoPoint[] { (5, 5), (5, 6), (4, 6), (5, 5));
            var polygon = new GeoPolygon(outerRing, hole1, hole2);

            // Construct a box from bottom left and top right corners
            var box = new GeoBox(bottomLeftCorner: (0, 0), topRightCorner: (10, 10));

            // Query using LINQ
            var query = realm.all<Company>().Where(c => QueryMethods.GeoWithin(c.Location, circle));

            // Query using RQL
            var query = realm.All<Company>().Filter("Location geoWithin $0", circle);
        }
    }

    public partial class CustomGeoPoint : RealmObject
    {
        [MapTo("coordinates")]
        private IList<double> Coordinates { get; } = null!;

        [MapTo("type")]
        private string Type { get; set; } = "Point";

        public double Latitude => Coordinates.Count > 1 ? Coordinates[1] : throw new Exception($"Invalid coordinate array. Expected at least 2 elements, but got: {Coordinates.Count}");

        public double Longitude => Coordinates.Count > 1 ? Coordinates[0] : throw new Exception($"Invalid coordinate array. Expected at least 2 elements, but got: {Coordinates.Count}");

        public CustomGeoPoint(double latitude, double longitude)
        {
            Coordinates.Add(longitude);
            Coordinates.Add(latitude);
        }
    }

}

