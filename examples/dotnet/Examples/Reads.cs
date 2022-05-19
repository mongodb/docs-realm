using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using Realms;

namespace ReadExamples
{

    public class ReadsTask : RealmObject
    {

        [PrimaryKey]
        [MapTo("_id")]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Assignee { get; set; }
        public bool IsComplete { get; set; }
        public int Priority { get; set; }
        public int ProgressMinutes { get; set; }
    }

    public class ReadsProject : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }

        public string Name { get; set; }
        public IList<ReadsTask> Tasks { get; }
    }


    public class Reads
    {
        public Reads()
        {
            var realm = Realm.GetInstance("");

            // :snippet-start: get-all
            //:replace-start: {
            // "terms": {
            //   "ReadsProject": "Project",
            //   "ReadsTask": "Task"}
            // }
            var projects = realm.All<ReadsProject>();
            var tasks = realm.All<ReadsTask>();
            // :replace-end:
            // :snippet-end:

            // :snippet-start: sort
            var projectsSorted = projects.OrderByDescending(p => p.Name);
            // :snippet-end:

            // :snippet-start: primary-key
            //:replace-start: {
            // "terms": {
            //   "ReadsProject": "Project",
            //   "ReadsTask": "Task"}
            // }
            // Object to be stored in the Realm instance
            var myTask = new ReadsTask
            {
                Id = 1
            };

            realm.Write(() =>
            {
                realm.Add(myTask);
            });

            // Other code...

            // Find specific object by primary key
            var obj = realm.Find<ReadsTask>(1);
            // :replace-end:
            // :snippet-end:

        }

    }

}
