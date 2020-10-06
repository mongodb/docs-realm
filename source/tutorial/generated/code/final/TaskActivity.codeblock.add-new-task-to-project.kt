val task = Task(input.text.toString())
// all realm writes need to occur inside of a transaction
projectRealm.executeTransactionAsync { realm ->
    realm.insert(task)
}