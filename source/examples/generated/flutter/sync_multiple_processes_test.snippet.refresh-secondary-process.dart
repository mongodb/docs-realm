// You must call realm.refresh() in the secondary process
// before the data written in the main process registers
// in the secondary process.
realm.refresh();
realm.find<Person>('John');
