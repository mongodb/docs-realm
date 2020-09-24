import * as React from "react";
import styled from "@emotion/styled";
import { Maybe, Task } from "../types";
import { TaskStatus } from "../hooks/useTasks";
import { useRealmApp } from "../realm/RealmApp";

import { TaskActions } from "../hooks/useTasks";
import { TaskView } from "./TaskView";
import Modal from "@leafygreen-ui/modal";
import Button from "@leafygreen-ui/button";

interface TaskDetailProps {
  task?: Maybe<Task>;
  taskActions: TaskActions;
}

interface TaskDetailModalProps {
  task?: Maybe<Task>;
  taskActions: TaskActions;
  closeModal: () => void;
}
export function TaskDetailModal({
  task,
  taskActions,
  closeModal,
}: TaskDetailModalProps): React.ReactElement {
  const { user } = useRealmApp();

  const changeTaskStatus = async (status: TaskStatus) => {
    if (!task) return;
    await taskActions.updateTask(task._id, { status });
  };

  const deleteTask = async (task: Task) => {
    if (!task) return;
    await taskActions.deleteTask(task);
    closeModal();
  };

  return (
    <PositionedModal
      size="small"
      open={Boolean(task)}
      shouldClose={() => {
        closeModal();
        return true;
      }}
    >
      {task && (
        <>
          <TaskView task={task} />
          {task?.status !== TaskStatus.Open && (
            <FullWidthButton onClick={() => changeTaskStatus(TaskStatus.Open)}>
              Move to Open
            </FullWidthButton>
          )}
          {task?.status !== TaskStatus.Inprogress && (
            <FullWidthButton
              onClick={() => changeTaskStatus(TaskStatus.Inprogress)}
            >
              Move to In Progress
            </FullWidthButton>
          )}
          {task?.status !== TaskStatus.Complete && (
            <FullWidthButton
              onClick={() => changeTaskStatus(TaskStatus.Complete)}
            >
              Move to Complete
            </FullWidthButton>
          )}
          {task.assignee?._id === user?.id && (
            <FullWidthButton variant="danger" onClick={() => deleteTask(task)}>
              Delete this task
            </FullWidthButton>
          )}
        </>
      )}
    </PositionedModal>
  );
}

const PositionedModal = styled(Modal)`
  > div {
    top: 20%;
  }
`;

const FullWidthButton = styled(Button)`
  width: 100%;
  margin: 8px 0;
`;

export function useTaskDetailView(
  tasks: Task[]
): [
  React.FC<TaskDetailProps>,
  {
    show: (task: Task) => void;
    close: () => void;
  }
] {
  const [currentTask, setCurrentTask] = React.useState<Maybe<Task>>(null);
  const updateCurrentTask = React.useCallback(
    (tasks: Task[]) => {
      if (currentTask) {
        const task = tasks.find((t: Task) => t._id === currentTask._id);
        if (task) setCurrentTask(task);
      }
    },
    [currentTask]
  );
  React.useEffect(() => {
    updateCurrentTask(tasks);
  }, [tasks, updateCurrentTask]);

  function show(task: Task) {
    setCurrentTask(task);
  }

  function close() {
    setCurrentTask(null);
  }

  const Component: React.FC<TaskDetailProps> = ({ taskActions }) => (
    <TaskDetailModal
      key={currentTask?._id}
      task={currentTask}
      taskActions={taskActions}
      closeModal={close}
    />
  );

  return [Component, { show, close }];
}
