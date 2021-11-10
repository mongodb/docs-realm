// You can also filter a collection
let tasksThatBeginWithA = tasks.where {
    $0.name.starts(with: "A")
}
print("A list of all tasks that begin with A: \(tasksThatBeginWithA)")
