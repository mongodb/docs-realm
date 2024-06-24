const filtered_out = realm.write(() => {
    return realm.create( WithCounterSchema, {_id: new BSON.ObjectId(), counter: 0 } ); // Object 1, counter = 0
});

const threshold = realm.write(() => {
    return realm.create( WithCounterSchema, {_id: new BSON.ObjectId(), counter: 1 } ); // Object 2, counter = 1
});

const passes_filter = realm.write(() => {
    return realm.create( WithCounterSchema, {_id: new BSON.ObjectId(), counter: 2 } ); // Object 3, counter = 2
});

const Objects = realm.objects('WithCounterSchema'); // creates list of objects

let filtered_objects = Objects.filtered('counter >= $0', threshold.counter.value);
