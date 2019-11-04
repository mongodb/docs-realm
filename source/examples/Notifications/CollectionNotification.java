// Implement a RecycleView Adapter that observes a collection for changes.
// This is just an example. Prefer RealmRecyclerViewAdapter for convenience.
public class DogsRecyclerAdapter extends RecyclerView.Adapter {
    RealmResults<Dog> dogs;

    // The constructor takes an open realm.
    public DogsRecyclerAdapter(Realm realm) {
        // Set up the collection notification handler.
        OrderedRealmCollectionChangeListener<RealmResults<Dog>> changeListener = (dogs, changeSet) -> {
            // `null`  means the async query returns the first time.
            if (changeSet == null) {
                notifyDataSetChanged();
                return;
            }
            // For deletions, the adapter has to be notified in reverse order.
            OrderedCollectionChangeSet.Range[] deletions = changeSet.getDeletionRanges();
            for (int i = deletions.length - 1; i >= 0; i--) {
                OrderedCollectionChangeSet.Range range = deletions[i];
                notifyItemRangeRemoved(range.startIndex, range.length);
            }

            OrderedCollectionChangeSet.Range[] insertions = changeSet.getInsertionRanges();
            for (OrderedCollectionChangeSet.Range range : insertions) {
                notifyItemRangeInserted(range.startIndex, range.length);
            }

            OrderedCollectionChangeSet.Range[] modifications = changeSet.getChangeRanges();
            for (OrderedCollectionChangeSet.Range range : modifications) {
                notifyItemRangeChanged(range.startIndex, range.length);
            }
        };
        dogs = realm.where(Dog.class).findAll();
        // Observe collection notifications.
        dogs.addChangeListener(changeListener);
    }
    // ...
}