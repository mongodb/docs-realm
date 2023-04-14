let actor = try await RealmActor()

try await createObject(in: actor)

let todo = await actor.realm.objects(Todo.self).where {
    $0.name == "Keep it safe"
}.first!
