import {useCallback} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import IntroText from './components/IntroText';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import colors from './styles/colors';
import SyncedSampleTask from './components/SampleSyncedTask';
import TaskContext, {Task} from './models/Task';

const {useRealm, useQuery} = TaskContext;

function SyncedApp() {
  const tasks = useQuery('Task');
  const realm = useRealm();

  const handleAddTask = useCallback(
    (description: string): void => {
      if (!description) {
        return;
      }
      realm.write(() => {
        realm.create('Task', Task.generate(description));
      });
    },
    [realm],
  );

  const handleToggleTaskStatus = useCallback(
    (task: Task): void => {
      realm.write(() => {
        task.isComplete = !task.isComplete;
      });
    },
    [realm],
  );

  const handleDeleteTask = useCallback(
    (task: Task): void => {
      realm.write(() => {
        realm.delete(task);
      });
    },
    [realm],
  );

  const firstUser = realm.objects('Task')[0];

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

        {firstUser ? <SyncedSampleTask _id={firstUser._id} /> : null}
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

export default SyncedApp;
