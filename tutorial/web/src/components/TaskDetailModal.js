import React from "react";
import TaskContent from "./TaskContent";
import Modal from "@leafygreen-ui/modal";
import ButtonGroup from "./ButtonGroup";
import useChangeTaskStatusButton from "./useChangeTaskStatusButton";

export default function TaskDetailModal({ project, task, unselectTask }) {
  const ChangeTaskStatusButton = useChangeTaskStatusButton(project);
  return (
    <Modal
      open={Boolean(task)} // Show the modal if we passed a Task into the task prop.
      setOpen={unselectTask} // When the user tries to close the modal, unset the Task to stop showing the modal
    >
      {task && (
        <>
          <TaskContent task={task} />
          <ButtonGroup direction="row">
            {task.status === "Open" && (
              <ChangeTaskStatusButton
                task={task}
                fromStatus="Open"
                toStatus="InProgress"
              >
                Start Progress
              </ChangeTaskStatusButton>
            )}
            {task.status === "InProgress" && (
              <>
                <ChangeTaskStatusButton
                  task={task}
                  fromStatus="InProgress"
                  toStatus="Open"
                >
                  Stop Progress
                </ChangeTaskStatusButton>
                <ChangeTaskStatusButton
                  task={task}
                  fromStatus="InProgress"
                  toStatus="Complete"
                >
                  Complete Task
                </ChangeTaskStatusButton>
              </>
            )}
            {task.status === "Complete" && (
              <ChangeTaskStatusButton
                task={task}
                fromStatus="Complete"
                toStatus="InProgress"
              >
                Resume Task
              </ChangeTaskStatusButton>
            )}
          </ButtonGroup>
        </>
      )}
    </Modal>
  );
}
