val queryByProperty = realm.query<Frog>("name == $0", "Kermit")
val frogsNamedKermit = queryByProperty.find()
