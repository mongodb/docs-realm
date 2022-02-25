// sort in descending order, frogs with distinct owners, only the first 5
val frogs: RealmResults<Frog> =
    realm.query<Frog>("name = 'George Washington' SORT(age DESC) DISTINCT(owner) LIMIT(5)").find()
