using System;
using NUnit.Framework;
using Realms.Sync;
using MongoDB.Bson;
using Realms;
using System.Linq;
using System.Collections.Generic;

namespace Examples
{

    public class QueryEngineExamples
    {
        public QueryEngineExamples()
        {
        }

        App app;
        User user;
        PartitionSyncConfiguration config;
        const string myRealmAppId = Config.appid;

        [OneTimeSetUp]
        public async System.Threading.Tasks.Task Setup()
        {
            app = App.Create(myRealmAppId);
            user = app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar")).Result;
            config = new PartitionSyncConfiguration("foo", user);
            //:hide-start:
            config.Schema = new[]
            {
                typeof(UserTask),
                typeof(UserProject)
            };
            //:hide-end:
            var realm = await Realm.GetInstanceAsync(config);
            var synchronousRealm = await Realm.GetInstanceAsync(config);

            var t = new UserTask() { Priority = 100, ProgressMinutes = 5, Assignee = "Jamie" };
            var t2 = new UserTask() { Priority = 1, ProgressMinutes = 500, Assignee = "Elvis" };
            var up = new UserProject() { Name = "A Big Project" };
            up.Tasks.Add(t);
            up.Tasks.Add(t2);
            realm.Write(() =>
            {
                realm.Add(t);
                realm.Add(t2);
                realm.Add(up);
            });
            return;
        }


        [Test]
        public async System.Threading.Tasks.Task Comparisons()
        {
            var realm = await Realm.GetInstanceAsync(config);
            var tasks = realm.All<UserTask>();
            // :code-block-start: comparisons
            var highPri = tasks.Where(t => t.Priority > 5);

            var quickTasks = tasks.Where(t =>
                t.ProgressMinutes >= 1 &&
                t.ProgressMinutes < 15);

            var unassignedTasks = tasks.Where(t =>
                t.Assignee == null);

            var AliOrJamieTasks = tasks.Where(t =>
                t.Assignee == "Ali" ||
                t.Assignee == "Jamie");
            // :code-block-end:

            Assert.AreEqual(1, highPri.Count());
            Assert.AreEqual(1, quickTasks.Count());
            Assert.AreEqual(0, unassignedTasks.Count());
            Assert.AreEqual(1, AliOrJamieTasks.Count());
            // :code-block-start: logical
            var completedTasksForAli = tasks.Where(t => t.Assignee == "Ali"
                && t.IsComplete);
            // :code-block-end:
            // :code-block-start: strings

            // Note: In each of the following examples, you can replace the
            // Where() method with First(), FirstOrDefault(),
            // Single(), SingleOrDefault(),
            // Last(), or LastOrDefault().

            // Get all tasks where the Assignee's name starts with "E" or "e"
            var tasksStartWitE = tasks.Where(t => t.Assignee.StartsWith("E",
                StringComparison.OrdinalIgnoreCase));

            // Get all tasks where the Assignee's name ends wth "is"
            // (lower case only)
            var endsWith = tasks.Where(t =>
                t.Assignee.EndsWith("is", StringComparison.Ordinal));

            // Get all tasks where the Assignee's name contains the
            // letters "ami" in any casing
            var tasksContains = tasks.Where(t => t.Assignee.Contains("ami",
                 StringComparison.OrdinalIgnoreCase));

            // Get all tasks that have no assignee
            var null_or_empty = tasks.Where(t => string.IsNullOrEmpty(t.Assignee));

            // :code-block-end:

            Assert.AreEqual(1, tasksStartWitE.Count());
            Assert.AreEqual(1, tasksContains.Count());
            Assert.AreEqual(0, null_or_empty.Count());

            var projects = realm.All<UserProject>();




            // :code-block-start: aggregate
            // Get all projects with an average Task priorty > 5:
            var avgPriority = projects.Filter(
                "Tasks.@avg.Priority > 5");

            // Get all projects where all Tasks are high-priority:
            var highPriProjects = projects.Filter(
                "Tasks.@min.Priority > 5");

            // Get all projects with long-running Tasks:
            var longRunningProjects = projects.Filter(
                "Tasks.@sum.ProgressMinutes > 100");
            // :code-block-end:

            // :code-block-start: rql
            var elvisProjects = projects.Filter("Tasks.Assignee == 'Elvis'");
            // :code-block-end:

            Assert.AreEqual(1, avgPriority.Count());
            Assert.AreEqual(0, highPriProjects.Count()); // 0 because the project has one lower than 5
            Assert.AreEqual(1, longRunningProjects.Count());
            Assert.AreEqual(1, elvisProjects.Count());
            return;
        }

        [OneTimeTearDown]
        public void Teardown()
        {
            var realm = Realm.GetInstance(config);
            realm.Write(() =>
            {
                realm.RemoveAll<UserTask>();
                realm.RemoveAll<UserProject>();
            });
        }
    }

    // :code-block-start: classes
    // :replace-start: {
    // "terms": {
    //   "UserTask": "Task",
    // "UserProject": "Project"}
    // }
    public class UserTask : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
        public string Name { get; set; }
        public string Assignee { get; set; }
        public bool IsComplete { get; set; }
        public int Priority { get; set; }
        public int ProgressMinutes { get; set; }
    }

    public class UserProject : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; } = ObjectId.GenerateNewId();
        public string Name { get; set; }
        public IList<UserTask> Tasks { get; }
    }
    // :replace-end:
    // :code-block-end:

}
