using System;
using Realms;
using System.Collections.Generic;

namespace Examples.Models
{
    public partial class CustomGeoPoint : IEmbeddedObject
    {
        [MapTo("coordinates")]
        public IList<double> Coordinates { get; } = null!;

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

