public class DogsRecyclerAdapter extends RealmRecyclerViewAdapter<Dog, TasksRecyclerAdapter.MyViewHolder> {
    RealmResults<Dog> dogs;
    public DogsRecyclerAdapter(OrderedRealmCollection<Dog> data) {
        super(data, true);

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
        Realm realm = Realm.getDefaultInstance();
        dogs = realm.where(Dog.class).findAll();
        // Observe collection notifications.
        dogs.addChangeListener(changeListener);
    }
    // ...
}
