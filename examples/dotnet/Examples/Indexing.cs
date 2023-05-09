using System;
using NUnit.Framework;
using System.Threading.Tasks;
using Realms;
using Examples.Models;
using System.Linq;

namespace Examples
{
    public class Indexing
    {


        [Test]
        public async Task Index()
        {
            var realm = Realm.GetInstance();

            // :snippet-start: linq-query-fts
            // :replace-start: {
            //  "terms": {
            //      "Person_Index": "Person"}
            // }
            var scientists = realm.All<Person_Index>()
                .Where(p => QueryMethods.FullTextSearch(p.Biography, "Scientist"));
            // :replace-end:
            // :snippet-end:

            // :snippet-start: rql-query-fts
            // :replace-start: {
            //  "terms": {
            //      "Person_Index": "Person"}
            // }
            var filteredScientists = realm.All<Person_Index>()
                .Filter("Biography TEXT $0", "Scientist");
            // :replace-end:
            // :snippet-end:

        }
    }
}

