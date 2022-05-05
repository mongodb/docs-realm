val tadpoles: RealmQuery<com.mongodb.realm.realmkmmapp.Frog> =
    realm.query<com.mongodb.realm.realmkmmapp.Frog>("age > $0", 2)
for (tadpole in tadpoles.find()) {
    realm.write {
        findLatest(tadpole)?.name = tadpole.name + " Jr."
    }
}
