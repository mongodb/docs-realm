realm.write(() {
  millenniumFalconCrew.name = 'Galactic Republic Scout Team';
  millenniumFalconCrew.crew
      .addAll([Person(ObjectId(), 'Luke'), Person(ObjectId(), 'Leia')]);
});
