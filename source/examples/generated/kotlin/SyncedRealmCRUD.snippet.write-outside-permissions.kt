// The `ownerId` of this item does not match the `user.id` of the logged-in
// user. The user does not have permissions to make this write, so
// it triggers a compensating write.
val itemWithWrongOwner = Item().apply {
    ownerId = "not the current user"
    itemName = "A simple item"
    complexity = 1
}
try {
    syncRealm.write {
        this.copyToRealm(itemWithWrongOwner)
    }
} catch (exception: Exception) {
    Log.e("Failed to write to realm: ${exception.message}")
}
