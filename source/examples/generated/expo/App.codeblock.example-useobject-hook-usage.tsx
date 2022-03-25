const SampleTask = ({ _id}) => {
  const myTask = useObject<Task>("Task", _id);
  return (<View><Text>Task: {myTask?.description} </Text></View>)
}
