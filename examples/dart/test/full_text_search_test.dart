import 'package:realm_dart/realm.dart';
import 'package:test/test.dart';

import './rug.dart';

main() {
  test('FTS query', () {

    final config = Configuration.local([Rug.schema]);
    final realm = Realm(config);

    final rug1 = Rug(ObjectId(), 'striped', 'wool', 2);
    
    realm.write(() {
      realm.add(rug1);
      });

    // :snippet-start: flutter-fts-query
    // Find rugs with a striped pattern
    final stripedRugs = realm.query<Rug>("pattern TEXT \$0", ["striped"]);

    // Find rugs with a wool material but not sheep wool
    final notSheepWoolRugs = realm.query<Rug>("material TEXT \$0", [" -sheep wool"]);
    // :snippet-end: 
    
  });
}
