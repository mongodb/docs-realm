package com.mongodb.javarealmsnippets.model;

import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;
import io.realm.annotations.Required;
import org.bson.types.ObjectId;

public class Task extends RealmObject {
    @PrimaryKey
    private ObjectId _id = new ObjectId();
    private String _partition = "My Project";
    private String name = "Task";

    @Required
    private String status = TaskStatus.Open.name();

    public void setStatus(TaskStatus status) {
        this.status = status.name();
    }

    public String getStatus() {
        return this.status;
    }

    public ObjectId get_id() {
        return _id;
    }

    public void set_id(ObjectId _id) {
        this._id = _id;
    }

    public String get_partition() {
        return _partition;
    }

    public void set_partition(String _partition) {
        this._partition = _partition;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Task(String _name, String project) {
        this._partition = project;
        this.name = _name;
    }

    public Task() {}

    public enum TaskStatus {
        Open("Open"),
        InProgress("In Progress"),
        Complete("Complete");

        String displayName;
        TaskStatus(String displayName) {
            this.displayName = displayName;
        }
    }
}
