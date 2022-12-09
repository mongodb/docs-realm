const TaskItem = ({ _id }) => {
    const realm = useRealm();
    const myTask = useObject("Task", _id);
    
    const incrementTaskProgress = () => {
        realm.write(() => {
            myTask.progressMinutes += 1;
        })
    }
    return (
        <>
            <Text>Task: {myTask.name}</Text>
            <Text>Progress made (in minutes):</Text>
            <Text>{myTask.progressMinutes}</Text>
            <Button onPress={() => incrementTaskProgress()} title="Increment Task Progress"/>
        </>
    )
}
