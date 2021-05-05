using System;
using NUnit.Framework;
using Realms.Sync;
using TaskStatus = dotnet.TaskStatus;
using Task = dotnet.Task;
using MongoDB.Bson;
using Realms;
using System.Linq;
using System.Collections.Generic;
using System.Globalization;

namespace Examples
{

    public class QueryEngineExamples
    {
        public QueryEngineExamples()
        {
        }

        App app;
        User user;
        SyncConfiguration config;
        const string myRealmAppId = Config.appid;

        [OneTimeSetUp]
        public async System.Threading.Tasks.Task Setup()
        {
            app = App.Create(myRealmAppId);
            user = app.LogInAsync(Credentials.EmailPassword("foo@foo.com", "foobar")).Result;
            config = new SyncConfiguration("myPart", user);
            //:hide-start:
            config.ObjectClasses = new[]
            {
                typeof(Task),
                typeof(UserTask),
                typeof(UserProject)
            };
            //:hide-end:
            var realm = await Realm.GetInstanceAsync(config);
            var synchronousRealm = await Realm.GetInstanceAsync(config);
            var testTask = new Task
            {
                Name = "Do this thing",
                Partition = "myPart",
                Status = TaskStatus.Open.ToString()
            };

            realm.Write(() =>
            {
                realm.Add(testTask);
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

            var quickTasks = tasks.Where(t => 1 <= t.ProgressMinutes
                && t.ProgressMinutes < 15);

            var unassignedTasks = tasks.Where(t => t.Assignee == null);

            var AliOrJamieTasks = tasks.Where(t => new List<string> { "Ali", "Jamie" }
                .Contains(t.Assignee));
            // :code-block-end:
            // :code-block-start: logical
            var completedTasksForAli = tasks.Where(t => t.Assignee == "Ali"
                && t.IsComplete);
            // :code-block-end:
            // :code-block-start: strings
            bool ignoreCase = true;

            var tasksThatStartWithE = tasks.Where(t => t.Name.StartsWith("E",
                ignoreCase, CultureInfo.CurrentCulture));

            var tasksNamesWithIe = tasks.Where(t => t.Name.Contains("ie",
                StringComparison.OrdinalIgnoreCase));
            // :code-block-end:

            var projects = realm.All<UserProject>();

            // :code-block-start: aggregate
            var highPriProjects = projects.Where(p => p.Tasks.Average(task =>
                task.Priority) > 5);

            var longRunningProjects = projects.Where(p => p.Tasks.Sum(t =>
                t.ProgressMinutes) > 120);
            // :code-block-end:
            return;
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
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public string Assignee { get; set; }
        public bool IsComplete { get; set; }
        public int Priority { get; set; }
        public int ProgressMinutes { get; set; }
    }

    public class UserProject : RealmObject
    {
        //:hide-start:
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId ID { get; set; }
        //:hide-end:
        public string Name { get; set; }
        public IList<UserTask> Tasks { get; }
    }
    // :replace-end:
    // :code-block-end:

}