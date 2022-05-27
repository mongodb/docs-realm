import { useCallback, useMemo } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import Realm from "realm";
import IntroText from "./app/components/IntroText";
import AddTaskForm from "./app/components/AddTaskForm";
import TaskList from "./app/components/TaskList";
import colors from "./app/styles/colors";
import LoadingSpinner from "./app/components/LoadingSpinner";
import LoginUserScreen from "./app/components/LoginUserScreen";

// :snippet-start: get-access-to-the-hooks
import TaskContext, { Task } from "./app/models/Task";

const { useRealm, useQuery, useObject } = TaskContext;
// :snippet-end:

function App() {
  // :snippet-start: example-usequery-hook-usage
  const tasks = useQuery("Task");
  // :uncomment-start:

  //return (
  //  <TaskList tasks={tasks} />
  //);

  // :uncomment-end:
  // :snippet-end:

  // :snippet-start: example-userealm-hook-usage
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
  // :snippet-end:

  const handleToggleTaskStatus = useCallback(
    (task: Task): void => {
      realm.write(() => {
        task.isComplete = !task.isComplete;
      });
    },
    [realm]
  );

  const handleDeleteTask = useCallback(
    (task: Task): void => {
      realm.write(() => {
        realm.delete(task);
      });
    },
    [realm]
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <AddTaskForm onSubmit={handleAddTask} />
        {tasks.length === 0 ? (
          <IntroText />
        ) : (
          <TaskList
            onToggleTaskStatus={handleToggleTaskStatus}
            onDeleteTask={handleDeleteTask}
          />
        )}
        <SampleTask _id={new Realm.BSON.ObjectId("623dd5d0a1b2b771505f94d4")} />
      </View>
    </SafeAreaView>
  );
}

// :snippet-start: example-useobject-hook-usage
const SampleTask = ({ _id }) => {
  const myTask = useObject(Task, _id);
  return (
    <View>
      <Text>Task: {myTask?.description} </Text>
    </View>
  );
};
// :snippet-end:

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


const app = new Realm.App({ id: "-id" });

// :snippet-start: dynamically-update-realm-config
// :replace-start: {
//   "terms": {
//     "AppWrapper2": "AppWrapper"
//   }
// }
function AppWrapper2() {
  if (!app.currentUser) {
    return <LoginUserScreen />;
  }
  const syncConfig = {
    user: app.currentUser,
    partitionValue: "ExpoTemplate",
  };

  return (
    <RealmProvider sync={syncConfig} fallback={() => <LoadingSpinner />}>
      <App />
    </RealmProvider>
  );
}
// :replace-end:
// :snippet-end:

export default App;
