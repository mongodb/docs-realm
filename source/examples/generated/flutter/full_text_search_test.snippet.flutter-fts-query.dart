// Find rugs with a chevron pattern
final chevronRugs = realm.query<Rug>("pattern TEXT \$0", ["chevron"]);

// Find rugs with a wool material but not sheep wool
final notSheepWoolRugs = realm.query<Rug>("material TEXT \$0", [" -sheep wool"]);
