import React, {useContext, useState, useEffect, useRef} from 'react';
import Realm from 'realm';
import {useAuth} from './AuthProvider';
import {Task} from './schemas';

// Create the context that will be provided to descendants of TasksProvider via
// the useTasks hook.
const TasksContext = React.createContext(null);

const TasksProvider = ({children, projectId}) => {
  // Get the user from the AuthProvider context.
  const {user} = useAuth();

  // The tasks list will contain the tasks in the realm when opened.
  const [tasks, setTasks] = useState([]);

  // This realm does not need to be a state variable, because we don't re-render
  // on changing the realm.
  const realmRef = useRef(null);

  // The effect hook replaces lifecycle methods such as componentDidMount. In
  // this effect hook, we open the realm that contains the tasks and fetch a
  // collection of tasks.
  useEffect(() => {
    // Check that the user is logged in. You must authenticate to open a synced
    // realm.
    if (user == null) {
      console.warn('TasksView must be authenticated!');
      return;
    }

    // Define the configuration for the realm to use the Task schema. Base the
    // sync configuration on the user settings and use the project ID as the
    // partition value. This will open a realm that contains all objects where
    // object._partition == projectId.
    const config = {
      schema: [Task.schema],
      sync: {
        user,
        partitionValue: projectId,
      },
    };

    console.log(
      `Attempting to open Realm ${projectId} for user ${
        user.identity
      } with config: ${JSON.stringify(config)}...`,
    );

    // Set this flag to true if the cleanup handler runs before the realm open
    // success handler, e.g. because the component unmounted.
    let canceled = false;

    // Now open the realm asynchronously with the given configuration.
    Realm.open(config)
      .then((openedRealm) => {
        // If this request has been canceled, we should close the realm.
        if (canceled) {
          openedRealm.close();
          return;
        }

        // Update the realmRef so we can use this opened realm for writing.
        realmRef.current = openedRealm;

        // Read the collection of all Tasks in the realm. Again, thanks to our
        // configuration above, the realm only contains tasks where
        // task._partition == projectId.
        const syncTasks = openedRealm.objects('Task');

        // Watch for changes to the tasks collection.
        openedRealm.addListener('change', () => {
          // On change, update the tasks state variable and re-render.
          setTasks([...syncTasks]);
        });

        // Set the tasks state variable and re-render.
        setTasks([...syncTasks]);
      })
      .catch((error) => console.warn('Failed to open realm:', error));

    // Return the cleanup function to be called when the component is unmounted
    // or the next time the effect runs.
    return () => {
      // Update the canceled flag shared between both this callback and the
      // realm open success callback above in case this runs first.
      canceled = true;

      // If there is an open realm, we must close it.
      const realm = realmRef.current;
      if (realm != null) {
        realm.removeAllListeners();
        realm.close();
        realmRef.current = null;
      }
    };
  }, [user, projectId]); // Declare dependencies list in the second parameter to useEffect().

  // Define our create, update, and delete functions that users of the
  // useTasks() hook can call.
  const createTask = (newTaskName) => {
    const realm = realmRef.current;
    // EXERCISE: Check that realm != null. If the realm is null, it isn't opened yet.

    // Open a write transaction.
    realm.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      realm.create(
        'Task',
        new Task({name: newTaskName || 'New Task', partition: projectId}),
      );
    });
  };

  // Define the function for updating a task's status.
  const setTaskStatus = (task, status) => {
    // One advantage of centralizing the realm functionality in this provider is
    // that we can check to make sure a valid status was passed in here.
    if (
      ![
        Task.STATUS_OPEN,
        Task.STATUS_IN_PROGRESS,
        Task.STATUS_COMPLETE,
      ].includes(status)
    ) {
      throw new Error(`Invalid Status ${status}`);
    }
    const realm = realmRef.current;

    realm.write(() => {
      task.status = status;
    });
  };

  // Define the function for deleting a task.
  const deleteTask = (task) => {
    const realm = realmRef.current;
    realm.write(() => {
      realm.delete(task);
    });
  };

  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <TasksContext.Provider
      value={{
        createTask,
        deleteTask,
        setTaskStatus,
        tasks,
        projectId,
      }}>
      {children}
    </TasksContext.Provider>
  );
};

// The useTasks hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useTasks = () => {
  const task = useContext(TasksContext);
  if (task == null) {
    throw new Error('useTasks() called outside of a TasksProvider?');
  }
  return task;
};

export {TasksProvider, useTasks};
