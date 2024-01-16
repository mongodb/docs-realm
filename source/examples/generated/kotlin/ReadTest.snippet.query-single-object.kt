val tadpoleQuery = realm.query<Frog>("age < $0", 1).first()
val findTadpole = tadpoleQuery.find()

if (findTadpole != null) {
    println("${findTadpole.name} is a tadpole.")
} else {
    println("No tadpoles found.")
}
