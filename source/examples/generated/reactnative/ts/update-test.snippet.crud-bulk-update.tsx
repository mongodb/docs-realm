const TaskDashboard = () => {
    const realm = useRealm();
    const tasks = useQuery("Task");

    const resetProgressOnAllTasks = () => {
        console.log('Reset Progress')
        realm.write(() => {
            for(const task of tasks){
                task.progressMinutes = 0;
            }
        })
    }
    return (
    <>
        {
            tasks.map((task) => {
                <Text>{task.name} has {task.progressMinutes} minutes progressed</Text>
            })
        }
        <Button onPress={resetProgressOnAllTasks} title="Reset Progress" testID="resetProgressOnAllTasksBtn"/>
    </>
    )
}
