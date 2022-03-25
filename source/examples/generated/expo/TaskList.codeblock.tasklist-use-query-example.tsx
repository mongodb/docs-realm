function TaskList({onToggleTaskStatus, onDeleteTask}) {
  const tasks = useQuery(Task);
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={tasks}
        renderItem={({item}) => (
          <TaskItem
            description={item.description}
            isComplete={item.isComplete}
            onToggleStatus={() => onToggleTaskStatus(item)}
            onDelete={() => onDeleteTask(item)}
          />
        )}
      />
    </View>
  );
}
