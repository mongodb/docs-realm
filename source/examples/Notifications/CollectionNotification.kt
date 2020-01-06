// Implement a RecycleView Adapter that observes a collection for changes.
// This is just an example. Prefer RealmRecyclerViewAdapter for convenience.
class DogsRecyclerAdapter(
    realm: Realm // The constructor takes an open Realm.
): RecyclerView.Adapter<*>() {
    private var dogs: RealmResults<Dog>

    init {
        // Set up the collection notification handler.
        val changeListener = OrderedRealmCollectionChangeListener<RealmResults<Dog>> { dogs, changeSet ->
            // `null`  means the async query returns the first time.
            if (changeSet == null) {
                notifyDataSetChanged()
                return@OrderedRealmCollectionChangeListener
            }
            // For deletions, the adapter has to be notified in reverse order.
            val deletions = changeSet.getDeletionRanges()
            for (i in deletions.indices.reversed()) {
                val range = deletions[i]
                notifyItemRangeRemoved(range.startIndex, range.length)
            }

            val insertions = changeSet.getInsertionRanges()
            for (range in insertions) {
                notifyItemRangeInserted(range.startIndex, range.length)
            }

            val modifications = changeSet.getChangeRanges()
            for (range in modifications) {
                notifyItemRangeChanged(range.startIndex, range.length)
            }
        }
        dogs = realm.where<Dog>().findAll()
        // Observe collection notifications.
        dogs.addChangeListener(changeListener)
    }
    // ...
}
