.. code-block:: javascript
   :emphasize-lines: 3, 12-15, 28-31

   const TaskList = () => {
     const [tasks, setTasks] = useState([]);
     useEffect(() => {
       Realm.open({
         schema: [TaskSchema], // predefined schema
       }).then(realm => {

         const tasks = realm.objects('Task');
         // set state to the initial value of your realm objects
         setTasks([...tasks]);

         tasks.addListener(() => {
           // update state of tasks to the updated value
           setTasks([...tasks]);
         });

         realm.write(() => {
           // the following tasks will trigger the change listener and update the UI
           realm.create('Task', {
             name: 'Go to the grocery store',
           });
           realm.create('Task', {
             name: 'Exercise in the gym',
           });
         });

         // cleanup function
         return () => {
           const tasks = realm.objects('Task');
           // Remember to remove the listener when you're done!
           tasks.removeAllListeners();
           // Call the close() method when done with a realm instance to avoid memory leaks.
           realm.close();
         };
       });
     }, []);

     return (
       <>
         {tasks.map(task => (
           <Text key={task.name}>{task.name}</Text>
         ))}
       </>
     );
   };
