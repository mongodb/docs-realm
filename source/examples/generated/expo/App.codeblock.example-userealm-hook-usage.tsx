const realm = useRealm();
const handleAddTask = (description: string) => {
  if (!description) {
    return;
  }
  realm.write(() => {
    realm.create("Task", Task.generate(description));
  });
}
