package com.mongodb.realm.examples.model.java;
// :code-block-start: define-object-model-local

public enum TaskStatus {
    Open("Open"),
    InProgress("In Progress"),
    Complete("Complete");

    String displayName;
    TaskStatus(String displayName) {
        this.displayName = displayName;
    }
}
// :code-block-end: