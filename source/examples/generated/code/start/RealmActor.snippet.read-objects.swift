let actor = try await RealmActor()

try await createObject(in: actor)

let todo = await actor.realm.objects(Todo.self).where {
    $0.name == "Write an example of updating an object on a RealmActor"
}.first!
