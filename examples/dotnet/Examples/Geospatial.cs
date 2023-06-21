using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Examples.Models;
using NUnit.Framework;
using Realms;
using Realms.Sync;

namespace Examples
{
    public class Geospatial
    {
        App app;
        Realm realm;

        [OneTimeSetUp]
        public void Setup()
        {
            app = App.Create(Config.FSAppId);
            realm = Realm.GetInstance();
            var company1 = new Company(47.68, -122.35);
            var company2 = new Company(47.9, -121.85);
            realm.Write(() =>
            {
                realm.Add(company1);
                realm.Add(company2);
            });
        }

        [Test]
        public async Task TestGeospatials()
        {
            // :snippet-start: geocircle
            var circle1 = new GeoCircle((47.8, -122.6),
                Distance.FromKilometers(44.4));
            var circle2 = new GeoCircle(new GeoPoint(latitude: 47.3, longitude: -122.9),
                Distance.FromDegrees(0.25));
            // :snippet-end:

            // :snippet-start: geocircle-query
            var testCircle = new GeoCircle((47.8, -122.6), Distance.FromKilometers(44.4));
            var matches = realm.All<Company>().Where(c => QueryMethods.GeoWithin(c.Location, testCircle));
            // :snippet-end:

            // :snippet-start: geopolygon
            // Define a polygon from a collection of points.
            var basicPolygon = new GeoPolygon((48, -122.8), (48.2, -121.8),
                (47.6, -121.6), (47.0, -122.0), (47.2, -122.6), (48, -122.8));

            // Define a polygon with one hole
            var outerRing = new GeoPoint[] {
                (48, -122.8), (48.2, -121.8),
                (47.6, -121.6), (47.0, -122.0), (47.2, -122.6),
                (48, -122.8) };

            var hole1 = new GeoPoint[] {
                (47.8, -122.6), (47.7, -122.2),
                (47.4, -122.6), (47.6, -122.5),
                (47.8, -122.6) };

            var polygonWithOneHole = new GeoPolygon(outerRing, hole1);

            // Define a polygon with more than one hole
            var hole2 = new GeoPoint[] {
                (47.55, -122.05), (47.5, -121.9),(47.3, -122.1),
                (47.55, -122.05) };

            var polygonWithTwoHoles = new GeoPolygon(outerRing, hole1, hole2);

            // The following polygons will throw System.ArgumentExceptions

            // Not enough points defined:
            // var notEnoughPointsPolygon = new GeoPolygon((20, 20), (10, 20), (0, 20));

            // The first and the last points do not match:
            // var closingPointDoesNotMatchPolygon = new GeoPolygon((20, 20), (10, 20), (0, 20), (10, 10));
            // :snippet-end:

            // :snippet-start: geopolygon-query
            var companiesInBasicPolygon = realm.All<Company>()
                .Where(c => QueryMethods.GeoWithin(c.Location, basicPolygon));
            // companiesInBasicPolygon.Count() == 2

            var companiesInPolygon = realm.All<Company>()
                .Where(c => QueryMethods.GeoWithin(c.Location, polygonWithTwoHoles));
            // companiesInPolygon.Count() == 1
            //:snippet-end:

            // :snippet-start: geobox
            // Construct a box from bottom left and top right corners
            var box1 = new GeoBox(bottomLeftCorner: (47.3, -122.7),
                topRightCorner: (48.1, -122.1));

            var box2 = new GeoBox(new GeoPoint(47.5, -122.4),
               new GeoPoint(47.9, -121.8));
            // :snippet-end:
            // :snippet-start: geobox-query

            // Query using LINQ
            var companiesInBox1 = realm.All<Company>().Where(c => QueryMethods.GeoWithin(c.Location, box1));
            // query1.Count() == 1

            // Query using RQL
            var companiesInBox2 = realm.All<Company>().Filter("Location geoWithin $0", box2);
            // query2.Count() == 2
            // :snippet-end:

            Assert.AreEqual(1, matches.Count());

            Assert.AreEqual(0, basicPolygon.Holes.Count);
            Assert.AreEqual(6, basicPolygon.OuterRing.Count);
            Assert.AreEqual(1, polygonWithOneHole.Holes.Count);
            Assert.AreEqual(2, polygonWithTwoHoles.Holes.Count);

            Assert.AreEqual(2, companiesInBasicPolygon.Count());
            Assert.AreEqual(1, companiesInPolygon.Count());

            Assert.AreEqual(1, companiesInBox1.Count());
            Assert.AreEqual(2, companiesInBox2.Count());
        }

        [OneTimeTearDown]
        public async Task TearDown()
        {
            realm.Write(() => { realm.RemoveAll<Company>(); });
            return;
        }

    }


    public partial class Company : IRealmObject
    {
        public CustomGeoPoint? Location { get; set; }

        public Company(double lat, double lon)
        {
            this.Location = new CustomGeoPoint(lat, lon);
        }
    }


}

