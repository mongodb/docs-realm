// Call realm.refresh() in the secondary process
// to trigger the data written in the main process
// to register in the secondary process.
realm.refresh();
realm.find<Person>('John');
