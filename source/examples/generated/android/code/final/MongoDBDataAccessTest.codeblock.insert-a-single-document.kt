val plant = Plant(
    ObjectId(),
    "lily of the valley",
    "full",
    "white",
    "perennial",
    "Store 47"
)
mongoCollection?.insertOne(plant)?.getAsync() { task ->
    if (it.isSuccess) {
        Log.v(
            "EXAMPLE",
            "successfully inserted a document with id: ${task.get().insertedId}"
        )
        expectation.fulfill()
    } else {
        Log.e("EXAMPLE", "failed to insert documents with: ${task.error}")
    }
}