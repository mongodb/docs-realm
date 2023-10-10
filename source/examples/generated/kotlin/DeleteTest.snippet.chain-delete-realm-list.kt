realm.write {
    // Query for the parent frog object
    val frog = query<Frog>("name == $0", "Kermit").find().first()
    val ponds = frog.favoritePonds
    assertEquals(4, ponds.size)
    // Iterate over the list and delete each pond
    if (ponds.isNotEmpty()) {
        ponds.forEach { pond ->
            delete(pond)
        }
    }
    // Delete the parent frog object
    val frogToDelete = findLatest(frog)
    if (frogToDelete != null) {
        delete(frogToDelete)
    }
}
