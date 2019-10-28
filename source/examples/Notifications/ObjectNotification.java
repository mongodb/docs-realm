RealmObjectChangeListener<Dog> listener = new RealmObjectChangeListener<Dog>() {
    @Override
    public void onChange(Dog dog, ObjectChangeSet changeSet) {
        if (changeSet.isDeleted()) {
            Log.i(TAG, "The dog was deleted");
            return;
        }

        for (String fieldName : changeSet.getChangedFields()) {
            Log.i(TAG, "Field " + fieldName + " was changed.");
        }
    }
};

Dog dog = realm.where(Dog.class).findFirst();
dog.addChangeListener(listener);
