//
//  Models.swift
//  Task Tracker
//
//  Created by MongoDB on 2020-05-07.
//  Copyright © 2020 MongoDB, Inc. All rights reserved.
//

import Foundation
import RealmSwift

// :code-block-start: user-model
class User: Object {
    // :hide-start:
    @objc dynamic var _id: String = ""
    @objc dynamic var _partition: String = ""
    @objc dynamic var name: String = ""
    let memberOf = RealmSwift.List<Project>()
    override static func primaryKey() -> String? {
        return "_id"
    }
    // :replace-with:
    // // TODO: Add User model (see SDKs panel in Realm UI)
    // :hide-end:
}
// :code-block-end:

// :code-block-start: project-model
class Project: EmbeddedObject {
    // :hide-start:
    @objc dynamic var name: String? = nil
    @objc dynamic var partition: String? = nil
    convenience init(partition: String, name: String) {
        self.init()
        self.partition = partition
        self.name = name
    }
    // :replace-with:
    // // TODO: Add Project model (see SDKs panel in Realm UI)
    // :hide-end: 
}
// :code-block-end:

enum TaskStatus: String {
  case Open
  case InProgress
  case Complete
}

// :code-block-start: task-model
// :hide-start:
class Task: Object {
    @objc dynamic var _id: ObjectId = ObjectId.generate()
    @objc dynamic var _partition: String = ""
    @objc dynamic var name: String = ""
    @objc dynamic var owner: String? = nil
    @objc dynamic var status: String = ""
    override static func primaryKey() -> String? {
        return "_id"
    }

    var statusEnum: TaskStatus {
        get {
            return TaskStatus(rawValue: status) ?? .Open
        }
        set {
            status = newValue.rawValue
        }
    }
    
    convenience init(partition: String, name: String) {
        self.init()
        self._partition = partition
        self.name = name
    }
}
// :replace-with:
// // TODO: Realm-ify Task model
// class Task {
//    var name: String = ""
//    var statusEnum: TaskStatus = .Open
// }
// :hide-end: 
// :code-block-end:

struct Member {
    let id: String
    let name: String
    init(document: Document) {
        self.id = document["_id"]!!.stringValue!
        self.name = document["name"]!!.stringValue!
    }
}

