const SampleTask = ({ _id }) => {
    const myTask = useObject(Task, _id);
    return (
      <View>
        <Text>Task: {myTask?.description} </Text>
      </View>
    );
  };
