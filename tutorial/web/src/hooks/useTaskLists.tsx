import * as React from "react";
import { Task, Scalars } from "../types";
import { TaskStatus } from "./useTasks";
import { taskStatus } from "../components/TaskLists";

import * as R from "ramda";
import { DropResult } from "react-beautiful-dnd";

function isStatus(task: Task, status: TaskStatus) {
  return task.status === status;
}

const isOpenTask = (task: Task) => isStatus(task, TaskStatus.Open);
const isInProgressTask = (task: Task) => isStatus(task, TaskStatus.Inprogress);
const isCompleteTask = (task: Task) => isStatus(task, TaskStatus.Complete);

type TaskListDescription = {
  status: TaskStatus;
  displayName: string;
  tasks: Array<Task>;
  displayOrder: Array<Scalars["ObjectId"]>;
};

const createLists = (tasks: Array<Task>) => {
  const openTasks = tasks.filter(isOpenTask);
  const inProgressTasks = tasks.filter(isInProgressTask);
  const completeTasks = tasks.filter(isCompleteTask);

  return [
    {
      status: TaskStatus.Open,
      displayName: "Open",
      tasks: openTasks,
      displayOrder: openTasks.map((t) => t._id),
    },
    {
      status: TaskStatus.Inprogress,
      displayName: "In Progress",
      tasks: inProgressTasks,
      displayOrder: inProgressTasks.map((t) => t._id),
    },
    {
      status: TaskStatus.Complete,
      displayName: "Complete",
      tasks: completeTasks,
      displayOrder: completeTasks.map((t) => t._id),
    },
  ];
};

const getTask = (tasks: Task[], id: Scalars["ObjectId"]): Task | undefined => {
  return tasks.find((task: Task) => task._id === id);
};

interface UseTaskListsPayload {
  lists: TaskListDescription[];
  actions: {
    handleDragAndDrop: (dragDropResult: DropResult) => void;
    undoDragAndDrop: (dragDropResult: DropResult) => void;
  };
}

const findListForStatus = (status: TaskStatus) =>
  R.find<TaskListDescription>(R.propEq("status", status));

export default function useTaskLists(tasks: Task[]): UseTaskListsPayload {
  const [lists, setLists] = React.useState<TaskListDescription[]>(
    createLists(tasks)
  );
  
  const updateListsWithNewTasks = React.useCallback((tasks: Task[]) => {
    setLists((lists: TaskListDescription[]) =>
      lists.map((list) => ({
        ...list,
        tasks: tasks.filter((t) => t.status === list.status),
      }))
    );
  }, []);

  const {
    addTasksToList,
    removeTaskFromList,
    moveTask,
    moveTaskInColumn,
  }: OrderedListActions = useOrderedListActions({
    lists,
    setLists,
  });

  const previousTasksRef = React.useRef<Task[] | undefined>();
  React.useEffect(() => {
    if (previousTasksRef.current) {
      const previousTasks = previousTasksRef.current;
      const updatedTasks = tasks;
      const isInPreviousTasks = (newTask: Task) =>
        Boolean(getTask(previousTasks, newTask._id));
      const isInUpdatedTasks = (oldTask: Task) =>
        Boolean(getTask(updatedTasks, oldTask._id));

      const newTasks = updatedTasks.filter(
        (task: Task) => !isInPreviousTasks(task)
      );
      const removedTasks = previousTasks.filter(
        (task: Task) => !isInUpdatedTasks(task)
      );
      // New tasks and removed tasks can't be modified tasks. Filter them out.
      const modifiedTasks = updatedTasks.filter((task: Task) => {
        const isNewTask = Boolean(getTask(newTasks, task._id));
        const isRemovedTask = Boolean(getTask(removedTasks, task._id));
        if (isNewTask || isRemovedTask) return false;
        const prev = getTask(previousTasks, task._id) as Task;
        const isModified = prev.status !== task.status;
        return isModified;
      });

      if (newTasks.length || removedTasks.length || modifiedTasks.length) {
        // Add new tasks
        Object.entries<Task[]>(
          newTasks.reduce(
            (grouped, task) => {
              return ({
              ...grouped,
              [task.status]: [...grouped[task.status as TaskStatus], task],
            })},
            {
              [TaskStatus.Open]: [],
              [TaskStatus.Inprogress]: [],
              [TaskStatus.Complete]: [],
            }
          )
        ).forEach(([status, tasks]) => {
          addTasksToList(tasks, status as TaskStatus);
        });
        // Delete removed tasks
        removedTasks.forEach((removedTask) => {
          removeTaskFromList(removedTask._id, removedTask.status as TaskStatus);
        });
        // Update modified tasks
        modifiedTasks.forEach((modifiedTask) => {
          const isThisTask = (t: Task) => t._id === modifiedTask._id;
          const oldStatus = (previousTasks.find(isThisTask) as Task).status;
          const oldIndex = (lists.find(
            (l) => l.status === oldStatus
          ) as TaskListDescription).displayOrder.findIndex(
            (id) => id === modifiedTask._id
          );
          const newStatus = modifiedTask.status;
          moveTask(modifiedTask, oldStatus as TaskStatus, oldIndex, newStatus as TaskStatus);
        });
        updateListsWithNewTasks(tasks);
      }
    }
    previousTasksRef.current = tasks;
  }, [
    tasks,
    lists,
    addTasksToList,
    removeTaskFromList,
    moveTask,
    updateListsWithNewTasks,
  ]);

  const handleDragAndDrop = (dragDropResult: DropResult) => {
    const { draggableId, source, destination } = dragDropResult;
    if (!destination) return;

    const taskId = draggableId;
    const task = getTask(tasks, taskId) as Task;
    const { droppableId: sourceStatus, index: sourceIndex } = source;
    const {
      droppableId: destinationStatus,
      index: destinationIndex,
    } = destination;

    if (sourceStatus === destinationStatus) {
      // Task did not change columns
      if (sourceIndex !== destinationIndex) {
        // Task change position within its column
        moveTaskInColumn(
          task,
          taskStatus.get(sourceStatus) || TaskStatus.Open,
          destinationIndex
        );
      }
    } else {
      // Task was moved to a different column
      moveTask(
        task,
        taskStatus.get(sourceStatus) as TaskStatus,
        sourceIndex,
        taskStatus.get(destinationStatus) as TaskStatus,
        destinationIndex
      );
    }
  };

  const undoDragAndDrop = (dragDropResult: DropResult) => {
    const source = dragDropResult?.destination;
    const destination = dragDropResult?.source;
    if (source && destination) {
      handleDragAndDrop({ ...dragDropResult, source, destination });
    }
  };

  return { lists, actions: { handleDragAndDrop, undoDragAndDrop } };
}

interface OrderedListActions {
  addTasksToList: (tasks: Task[], status: TaskStatus) => void;
  removeTaskFromList: (task: Task, status: TaskStatus) => void;
  moveTask: (
    task: Task,
    oldStatus: TaskStatus,
    oldDisplayIndex: number,
    newStatus: TaskStatus,
    newDisplayIndex?: number
  ) => void;
  moveTaskInColumn: (task: Task, status: TaskStatus, newIndex: number) => void;
}

function useOrderedListActions({
  lists,
  setLists,
}: {
  lists: TaskListDescription[];
  setLists: React.Dispatch<React.SetStateAction<TaskListDescription[]>>;
}): OrderedListActions {
  const addTasksToList = React.useCallback(
    (tasks: Task[], status: TaskStatus) => {
      const listToUpdate = findListForStatus(status)(lists);
      if (!listToUpdate) return;
      const updatedDisplayOrder = [
        ...listToUpdate.displayOrder,
        ...tasks.map((t) => t._id),
      ];
      setLists((prevLists: TaskListDescription[]) =>
        prevLists.map((list) =>
          status !== list.status
            ? list
            : {
                ...listToUpdate,
                tasks: [...listToUpdate.tasks, ...tasks],
                displayOrder: Array.from(new Set(updatedDisplayOrder)),
              }
        )
      );
    },
    [lists, setLists]
  );

  const addTaskToList = React.useCallback(
    (task: Task, status: TaskStatus, displayIndex?: number) => {
      const listToUpdate = findListForStatus(status)(lists);
      if (!listToUpdate) return;
      let updatedDisplayOrder: Array<Scalars["ObjectId"]> = [];
      if (displayIndex) {
        updatedDisplayOrder = R.insert(
          displayIndex,
          task._id,
          listToUpdate.displayOrder
        );
      } else {
        updatedDisplayOrder = [...listToUpdate.displayOrder, task._id];
      }
      setLists((prevLists: TaskListDescription[]) =>
        prevLists.map((list) =>
          status !== list.status
            ? list
            : {
                ...listToUpdate,
                tasks: [...listToUpdate.tasks, task],
                displayOrder: Array.from(new Set(updatedDisplayOrder)),
              }
        )
      );
    },
    [lists, setLists]
  );

  const removeTaskFromList = React.useCallback(
    (task: Task, status: TaskStatus) => {
      const listToUpdate = findListForStatus(status)(lists);
      if (!listToUpdate) return;
      const updatedDisplayOrder: Array<
        Scalars["ObjectId"]
      > = listToUpdate.displayOrder.filter((id) => id !== task._id);
      setLists((prevLists: TaskListDescription[]) =>
        prevLists.map((list) =>
          status !== list.status
            ? list
            : {
                ...listToUpdate,
                tasks: listToUpdate.tasks.filter((t) => t._id !== task._id),
                displayOrder: Array.from(new Set(updatedDisplayOrder)),
              }
        )
      );
    },
    [lists, setLists]
  );

  const moveTask = React.useCallback(
    (
      task: Task,
      oldStatus: TaskStatus,
      oldDisplayIndex: number,
      newStatus: TaskStatus,
      newDisplayIndex?: number
    ) => {
      removeTaskFromList(task, oldStatus);
      addTaskToList(task, newStatus, newDisplayIndex);
    },
    [removeTaskFromList, addTaskToList]
  );

  const moveTaskInColumn = React.useCallback(
    (task: Task, status: TaskStatus, newIndex: number) => {
      const listToUpdate = findListForStatus(status)(lists);
      if (!listToUpdate) return;
      const oldIndex = listToUpdate.displayOrder.findIndex(
        (id) => id === task._id
      );
      const updatedDisplayOrder: Array<Scalars["ObjectId"]> = R.move(
        oldIndex,
        newIndex,
        listToUpdate.displayOrder
      );
      setLists((prevLists: TaskListDescription[]) =>
        prevLists.map((list) =>
          status !== list.status
            ? list
            : {
                ...listToUpdate,
                displayOrder: Array.from(new Set(updatedDisplayOrder)),
              }
        )
      );
    },
    [lists, setLists]
  );

  return {
    addTasksToList,
    removeTaskFromList,
    moveTask,
    moveTaskInColumn,
  };
}
