// Search equality on the primary key field name
val frogs: Frog? = realm.query<Frog>("_id == $0", PRIMARY_KEY_VALUE).first().find()
