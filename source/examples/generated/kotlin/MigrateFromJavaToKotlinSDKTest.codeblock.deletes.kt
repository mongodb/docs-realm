val sample: Sample? =
    realm.query<Sample>()
        .first().find()

// delete one object synchronously
realm.writeBlocking {
    val liveSample: Sample? =
        this.findLatest(sample!!)
    liveSample?.delete()
}

// delete a query result asynchronously
GlobalScope.launch {
    realm.write {
        query<Sample>()
            .first()
            .find()
            .also { delete(it!!) }
    }
}
