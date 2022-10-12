using System.Collections.Generic;
using MongoDB.Bson;
using Realms;

namespace Examples.RqlSchemaExamples
{
    // :snippet-start: rql-schema-examples
    // :replace-start: {
    //  "terms": {
    //   "RqlTask": "Task",
    //   "RqlProject": "Project",
    //   "RqlTasks": "Tasks"}
    // }
    public class RqlTask : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [MapTo("name")]
        [Required]
        public string Name { get; set; }

        [MapTo("isComplete")]
        public bool IsComplete { get; set; } = false;

        [MapTo("assignee")]
        public string Assignee { get; set; }

        [MapTo("priority")]
        public int Priority { get; set; } = 0;

        [MapTo("progressMinutes")]
        public int ProgressMinutes { get; set; } = 0;

        [MapTo("projects")]
        [Backlink(nameof(RqlProject.RqlTasks))]
        public IQueryable<RqlProject> Projects { get; }
    }

    public class RqlProject : RealmObject
    {
        [PrimaryKey]
        [MapTo("_id")]
        public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

        [MapTo("name")]
        [Required]
        public string Name { get; set; }

        [MapTo("tasks")]
        public IList<RqlTask> RqlTasks { get; }

        [MapTo("quota")]
        public int Quota { get; set; }
    }
    // :replace-end:
    // :snippet-end:
}
