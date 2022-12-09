const TaskItem = ({_id}) => {
  const myTask = useObject('Task', _id);
  return (
    <View>
      <Text testID="task-item-sentence">
        {myTask.name} is a task with the priority of: {myTask.priority}
      </Text>
    </View>
  );
};
