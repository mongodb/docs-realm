val fliesSnack = realm.query<Snack>("name = 'flies'").first().find()

set.remove(fliesSnack)
