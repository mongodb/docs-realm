package com.mongodb.realm.examples.model.java;
// :code-block-start: define-object-model-local
// :replace-start: {
//    "terms": {
//       "DefinitelyNotJavaTask": "Task"
//    }
// }
import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;
import io.realm.annotations.Required;

public class DefinitelyNotJavaTask extends RealmObject {
    @PrimaryKey private String name;
    @Required private String status = TaskStatus.Open.name();

    public void setStatus(TaskStatus status) { this.status = status.name(); }
    public String getStatus() { return this.status; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public DefinitelyNotJavaTask(String _name) { this.name = _name; }
    public DefinitelyNotJavaTask() {}
}
// :replace-end:
// :code-block-end:
