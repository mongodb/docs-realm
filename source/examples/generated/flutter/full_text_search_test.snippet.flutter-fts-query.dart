// Find rugs with a striped pattern
final stripedRugs = realm.query<Rug>("pattern TEXT \$0", ["striped"]);

// Find rugs with a wool material but not sheep wool
final notSheepWoolRugs = realm.query<Rug>("material TEXT \$0", [" -sheep wool"]);
