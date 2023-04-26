realm.write {
    this.copyToRealm(Frog().apply {
        name = "Kermit"
        favoritePondsByForest = realmDictionaryOf("Hundred Acre Wood" to "Picnic Pond", "Lothlorien" to "Linya")
    })
}
