const realm = useRealm();
const handleAddTask = useCallback(
  (description: string): void => {
    if (!description) {
      return;
    }
    realm.write(() => {
      realm.create("Task", Task.generate(description));
    });
  },
  [realm]
);
