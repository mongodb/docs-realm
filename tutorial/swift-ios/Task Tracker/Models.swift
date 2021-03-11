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
    // :state-start: final
    @objc dynamic var _id: String = ""
    @objc dynamic var _partition: String = ""
    @objc dynamic var name: String = ""
    let memberOf = RealmSwift.List<Project>()
    override static func primaryKey() -> String? {
        return "_id"
    }
    // :state-end: :state-uncomment-start: start
    // // TODO: Add User model (see SDKs panel in Realm UI)
    // :state-uncomment-end:
}
// :code-block-end:

// :code-block-start: project-model
class Project: EmbeddedObject {
    // :state-start: final
    @objc dynamic var name: String?
    @objc dynamic var partition: String?
    convenience init(partition: String, name: String) {
        self.init()
        self.partition = partition
        self.name = name
    }
    // :state-end: :state-uncomment-start: start
    // // TODO: Add Project model (see SDKs panel in Realm UI)
    // :state-uncomment-end:
}
// :code-block-end:

enum TaskStatus: String {
  case Open
  case InProgress
  case Complete
}

// :code-block-start: task-model
// :state-start: final
class Task: Object {
    @objc dynamic var _id: ObjectId = ObjectId.generate()
    @objc dynamic var _partition: String = ""
    @objc dynamic var name: String = ""
    @objc dynamic var owner: String?
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
// :state-end: :state-uncomment-start: start
// // TODO: Realm-ify Task model
// class Task {
//    var name: String = ""
//    var statusEnum: TaskStatus = .Open
// }
// :state-uncomment-end:
// :code-block-end:

struct Member {
    let id: String
    let name: String
    init(document: Document) {
        self.id = document["_id"]!!.stringValue!
        self.name = document["name"]!!.stringValue!
    }
}
