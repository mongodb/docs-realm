val fliesSnack = query<Snack>("name == $0", "flies").first().find()

set.remove(fliesSnack)
