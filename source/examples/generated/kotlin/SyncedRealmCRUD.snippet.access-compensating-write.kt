val syncErrorHandler = SyncSession.ErrorHandler { session, error ->
    runBlocking {
        if (error is CompensatingWriteException) {
            channel.send(error)
            val writeInfo = error.writes[0]
            val errorMessage = """
                A write was rejected with a compensating write error
                The write to object type: ${writeInfo.objectType}
                With primary key of: ${writeInfo.primaryKey}
                Was rejected because: ${writeInfo.reason}
            """.trimIndent()
            Log.e(errorMessage)
        }
    }
}
