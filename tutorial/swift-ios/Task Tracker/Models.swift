//
//  Models.swift
//  Task Tracker
//
//  Created by MongoDB on 2020-05-07.
//  Copyright © 2020-2021 MongoDB, Inc. All rights reserved.
//

import Foundation
import RealmSwift

// :code-block-start: user-model
// :state-start: sync
class User: Object {
    @objc dynamic var _id: String = ""
    @objc dynamic var name: String = ""
    let memberOf = RealmSwift.List<Project>()
    override static func primaryKey() -> String? {
        return "_id"
    }
}
// :state-end:
// :code-block-end:
// :code-block-start: project-model
// :state-start: sync
class Project: EmbeddedObject {
    @objc dynamic var name: String?
    @objc dynamic var partition: String?
    convenience init(partition: String, name: String) {
        self.init()
        self.partition = partition
        self.name = name
    }
}
// :state-end:
// :code-block-end:

enum TaskStatus: String {
  case Open
  case InProgress
  case Complete
}

// :code-block-start: task-model
// :state-start: local sync
class Task: Object {
    @objc dynamic var _id: ObjectId = ObjectId.generate()
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

    convenience init(name: String) {
        self.init()
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
