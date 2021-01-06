let realm = try! Realm()

// Establish an inverse relationship
let owner = DogOwner()
owner.id = 12345

let club = DogClub()
club.name = "Pooch Pals"
club.members.append(owner)

try! realm.write {
    realm.add(club)
}

// Later, query the specific owner
let specificOwner = realm.object(ofType: DogOwner.self, forPrimaryKey: 12345)

// Access directly through an inverse relationship
print("# memberships: \(specificOwner!.clubs.count)")
print("First club's name: \(specificOwner!.clubs[0].name)")
