class Kid : RealmObject {
    var frogs: RealmList<Frog> = realmListOf()
    var nullableFrogs: RealmList<Frog?> = realmListOf()
}
