import React, { useState } from "react";
import { Text, ListItem } from "react-native-elements";
import { useTasks } from "../providers/TasksProvider";
import { ActionSheet } from "./ActionSheet";
import { Task } from "../schemas";

export function TaskItem({ task }) {
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  const { deleteTask, setTaskStatus } = useTasks();
  const actions = [
    {
      title: "Delete",
      action: () => {
        deleteTask(task);
      },
    },
  ];

  // For each possible status other than the current status, make an action to
  // move the task into that status. Rather than creating a generic method to
  // avoid repetition, we split each status to separate each case in the code
  // below for demonstration purposes.
  // :code-block-start: define-task-status-actions
  // :hide-start:
  if (task.status !== "" && task.status !== Task.STATUS_OPEN) {
    actions.push({
      title: "Mark Open",
      action: () => {
        setTaskStatus(task, Task.STATUS_OPEN);
      },
    });
  }
  if (task.status !== Task.STATUS_IN_PROGRESS) {
    actions.push({
      title: "Mark In Progress",
      action: () => {
        setTaskStatus(task, Task.STATUS_IN_PROGRESS);
      },
    });
  }
  if (task.status !== Task.STATUS_COMPLETE) {
    actions.push({
      title: "Mark Complete",
      action: () => {
        setTaskStatus(task, Task.STATUS_COMPLETE);
      },
    });
  }
  // :replace-with:
  //// TODO
  // :hide-end:
  // :code-block-end:

  return (
    <>
      <ActionSheet
        visible={actionSheetVisible}
        closeOverlay={() => {
          if (task.status) {
            setActionSheetVisible(false);
          }
        }}
        actions={actions}
      />
      <ListItem
        key={task.id}
        onPress={() => {
          setActionSheetVisible(true);
        }}
        title={task.name}
        bottomDivider
        checkmark={
          task.status === Task.STATUS_COMPLETE ? (
            <Text>&#10004; {/* checkmark */}</Text>
          ) : task.status === Task.STATUS_IN_PROGRESS ? (
            <Text>In Progress</Text>
          ) : null
        }
      />
    </>
  );
}
