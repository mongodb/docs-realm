const TaskItem = ({ _id }) => {
    const realm = useRealm();
    const myTask = useObject("Task", _id);
    
    const incrementTask = () => {
        realm.write(() => {
            myTask.progressMinutes += 1;
        })
    }
    return (
        <>
            <Text>Task: {myTask.name}</Text>
            <Text>Progress made (in minutes):</Text>
            <Text>{myTask.progressMinutes}</Text>
            <Button onPress={() => incrementTask()} title="Submit Item"/>
        </>
    )
}
