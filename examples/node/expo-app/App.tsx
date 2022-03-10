import { useCallback, useMemo } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
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
// import TaskContext from "./app/models/Task";

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

  const id = 123;
  
  // :code-block-start: example-useobject-hook-usage
  const myTask = useObject("Task", id);
  console.log(myTask.description);
  // :code-block-end:

  // :code-block-start: example-userealm-hook-usage
  // :uncomment-start:
  // const realm = useRealm();
  // :uncomment-end:
  const handleAddTask = (description: string) => {
    if (!description) {
      return;
    }
    realm.write(() => {
      realm.create("Task", Task.generate(description));
    });
  }
  // :code-block-end:

  // const handleAddTask = useCallback(
  //   (description: string): void => {
  //     if (!description) {
  //       return;
  //     }

  //     // Everything in the function passed to "realm.write" is a transaction and will
  //     // hence succeed or fail together. A transcation is the smallest unit of transfer
  //     // in Realm so we want to be mindful of how much we put into one single transaction
  //     // and split them up if appropriate (more commonly seen server side). Since clients
  //     // may occasionally be online during short time spans we want to increase the probability
  //     // of sync participants to successfully sync everything in the transaction, otherwise
  //     // no changes propagate and the transaction needs to start over when connectivity allows.
  //     realm.write(() => {
  //       realm.create("Task", Task.generate(description));
  //     });
  //   },
  //   [realm],
  // );

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
          <TaskList tasks={tasks} onToggleTaskStatus={handleToggleTaskStatus} onDeleteTask={handleDeleteTask} />
        )}
      </View>
    </SafeAreaView>
  );
}

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
  if (!RealmProvider) {
    return null;
  }
  return (
    <RealmProvider>
      <App />
    </RealmProvider>
  );
}
// :code-block-end:

const app = new Realm.App({id: "sample-id"});

// :code-block-start: dynamically-update-realm-config
// :replace-start: {
//   "terms": {
//     "AppWrapper2": "AppWrapper"
//   }
// }
function AppWrapper2() {
  if (!RealmProvider) {
    return null;
  }
  const syncConfig = {
    user: app.currentUser,
    partitionValue: "ExpoTemplate"
  }

  return (
    <RealmProvider sync={syncConfig}>
      <App />
    </RealmProvider>
  );
}
// :replace-end:
// :code-block-end:


export default AppWrapper;
