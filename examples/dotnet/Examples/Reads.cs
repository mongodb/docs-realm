using System;
using System.Collections.Generic;
using System.Linq;
using Realms;

namespace ReadExamples
{

    public class Task : RealmObject
    {
        [PrimaryKey]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Assignee { get; set; }
        public bool IsComplete { get; set; }
        public int Priority { get; set; }
        public int ProgressMinutes { get; set; }
    }

    public class Project : RealmObject
    {
        public string Name { get; set; }
        public IList<Task> Tasks { get; }
    }


    public class Reads
    {
        public Reads()
        {
            var realm = Realm.GetInstance("");

            // :code-block-start: get-all
            var projects = realm.All<Project>();
            var tasks = realm.All<Task>();
            // :code-block-end:

            // :code-block-start: sort
            var projectsSorted = projects.OrderByDescending(p => p.Name);
            // :code-block-end:

            // :code-block-start: primary-key
            // Object to be stored in the Realm instance
            var myTask = new Task
            {
                Id = 1
            };

            realm.Write(() =>
            {
                realm.Add(myTask);
            });

            // Other code...

            // Find specific object by primary key
            var obj = realm.Find<Task>(1);
            // :code-block-end:

        }

    }

}
