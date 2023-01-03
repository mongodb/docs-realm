final artemis = realm.write(() => realm.add(Player('Art3mis', inventory: [
      Item('elvish sword', 'sword forged by elves'),
      Item('body armor', 'protects player from damage'),
    ], traits: [
      'brave',
      'kind'
    ])));

// Use RealmList methods to filter results
RealmList<String> traits = artemis.traits;
final brave = traits.firstWhere((element) => element == 'brave');

final elvishSword =
    artemis.inventory.where((item) => item.name == 'elvish sword').first;

// Query RealmList with Realm Query Language
final playersWithBodyArmor =
    realm.query<Player>("inventory.name == \$0", ['body armor']);
print("LEN " + playersWithBodyArmor.length.toString()); // currently `0`,
// but think it should be 1
