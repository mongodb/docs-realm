Realm.setLogger((level, message) => {
  logs.push({ level, message });
});
