// Search equality on the primary key field name
realm.query<Frog>("_id == $0", PRIMARY_KEY_VALUE).find()
