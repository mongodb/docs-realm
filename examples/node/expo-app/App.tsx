import { useCallback, useMemo } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import Realm from 'realm';


import TaskContext, { Task } from "./app/models/Task";
import IntroText from "./app/components/IntroText";
import AddTaskForm from "./app/components/AddTaskForm";
import TaskList from "./app/components/TaskList";
import colors from "./app/styles/colors";

// :code-block-start: import-task-context
// :uncomment-start:
// import TaskContext from "./app/models/Task";

// :uncomment-end:
const { RealmProvider } = TaskContext;
// :code-block-end:

// :code-block-start: get-access-to-the-hooks
// :uncomment-start:
// import TaskContext, { Task } from "./app/models/Task";

// :uncomment-end:
const { useRealm, useQuery, useObject } = TaskContext;
// :code-block-end:

function App() {
  const realm = useRealm();

  // :code-block-start: example-usequery-hook-usage
  const tasks = useQuery("Task");
  // :uncomment-start:

  //return (
  //  <TaskList tasks={tasks} />
  //);

  // :uncomment-end:
  // :code-block-end:

  // :code-block-start: example-userealm-hook-usage
  // :uncomment-start:
  // const realm = useRealm();
  // :uncomment-end:
  const handleAddTask = useCallback(
    (description: string): void => {
    if (!description) {
      return;
    }
    realm.write(() => {
      realm.create("Task", Task.generate(description));
    });
  },[realm]);
  // :code-block-end:

  const handleToggleTaskStatus = useCallback(
    (task: Task): void => {
      realm.write(() => {
        // Normally when updating a record in a NoSQL or SQL database, we have to type
        // a statement that will later be interpreted and used as instructions for how
        // to update the record. But in RealmDB, the objects are "live" because they are
        // actually referencing the object's location in memory on the device (memory mapping).
        // So rather than typing a statement, we modify the object directly by changing
        // the property values. If the changes adhere to the schema, Realm will accept
        // this new version of the object and wherever this object is being referenced
        // locally will also see the changes "live".
        task.isComplete = !task.isComplete;
      });

      // Alternatively if passing the ID as the argument to handleToggleTaskStatus:
      // realm?.write(() => {
      //   const task = realm?.objectForPrimaryKey('Task', id); // If the ID is passed as an ObjectId
      //   const task = realm?.objectForPrimaryKey('Task', Realm.BSON.ObjectId(id));  // If the ID is passed as a string
      //   task.isComplete = !task.isComplete;
      // });
    },
    [realm],
  );

  const handleDeleteTask = useCallback(
    (task: Task): void => {
      realm.write(() => {
        realm.delete(task);

        // Alternatively if passing the ID as the argument to handleDeleteTask:
        // realm?.delete(realm?.objectForPrimaryKey('Task', id));
      });
    },
    [realm],
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <AddTaskForm onSubmit={handleAddTask} />
        {tasks.length === 0 ? (
          <IntroText />
        ) : (
          <TaskList onToggleTaskStatus={handleToggleTaskStatus} onDeleteTask={handleDeleteTask} />
        )}
        <SampleTask _id ={new Realm.BSON.ObjectId("623dd5d0a1b2b771505f94d4")} />
      </View>
    </SafeAreaView>
  );
}

  // :code-block-start: example-useobject-hook-usage
const SampleTask = ({ _id}) => {
  const myTask = useObject(Task, _id);
  return (<View><Text>Task: {myTask?.description} </Text></View>)
}
// :code-block-end:



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.darkBlue,
  },
  content: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

// :code-block-start: wrap-app-within-realm-provider
function AppWrapper() {
  if (!app.currentUser) {
    return (<LoginUserScreen />);
  }
  return (
    <RealmProvider>
      <App />
    </RealmProvider>
  );
}
// :code-block-end:

const app = new Realm.App({id: "-id"});

// :code-block-start: dynamically-update-realm-config
// :replace-start: {
//   "terms": {
//     "AppWrapper2": "AppWrapper"
//   }
// }
function AppWrapper2() {
  if (!app.currentUser) {
    return (<LoginUserScreen />);
  }
  const syncConfig = {
    user: app.currentUser,
    partitionValue: "ExpoTemplate"
  }

  return (
    <RealmProvider sync={syncConfig} fallback={() => <LoadingSpinner/>}>
      <App />
    </RealmProvider>
  );
}
// :replace-end:
// :code-block-end:

const LoadingSpinner = () => (<Text>Mock Loading Spinner</Text>)

export default AppWrapper;
