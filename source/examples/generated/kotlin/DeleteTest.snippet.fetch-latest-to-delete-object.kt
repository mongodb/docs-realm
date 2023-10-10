val frozenFrog = realm.query<Frog>("name == $0", "Kermit").find().first()

// Open a write transaction
realm.writeBlocking {
    // Get the live frog object with findLatest(), then delete it
    findLatest(frozenFrog)?.let { liveFrog ->
        delete(liveFrog)
    }
}
