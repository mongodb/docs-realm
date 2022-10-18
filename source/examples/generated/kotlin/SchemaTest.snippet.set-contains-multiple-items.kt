val setOfFrogSnacks = setOf(cricketsSnack, earthWormsSnack, waxWormsSnack)
Log.v(
    "Does Kermit eat crickets, earth worms, and wax worms?: ${
        set.containsAll(
            setOfFrogSnacks
        ) // true
    }"
)
