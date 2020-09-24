/** @jsx jsx */
import * as React from "react";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { uiColors } from "@leafygreen-ui/palette";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragDropContextProps,
} from "react-beautiful-dnd";

import { Task } from "../types";
import TaskCard, { DraftTaskCard } from "./TaskCard";
import { TaskStatus, TaskActions } from "../hooks/useTasks";
import useDraftTask from "../hooks/useDraftTask";
import useTaskLists from "../hooks/useTaskLists";
import { useRealmApp } from "../realm/RealmApp";

export const taskStatus = new Map<string, TaskStatus>([
  ["OPEN", TaskStatus.Open],
  ["INPROGRESS", TaskStatus.Inprogress],
  ["COMPLETE", TaskStatus.Complete],
]);

interface TaskListsProps {
  tasks: Task[];
  taskActions: TaskActions;
  showDetail: (task: Task) => void;
}

export function TaskLists(props: TaskListsProps): React.ReactElement {
  const { tasks, taskActions, showDetail } = props;
  const { lists, actions: listActions } = useTaskLists(tasks);

  const onDragEnd = (result: DropResult) => {
    // Parse the drag and drop DropResult
    const {
      draggableId: taskId,
      destination: { droppableId: destinationStatus } = {
        droppableId: null,
      },
    } = result;
    // If there wasn't a valid drop destination, don't do anything
    if (!destinationStatus) return;
    // Manipulate the in-memory lists, preserving drag and drop order
    listActions.handleDragAndDrop(result);
    // Update the Task if it changed status
    const newStatus = taskStatus.get(destinationStatus);
    if (newStatus) {
      taskActions
        .updateTask(taskId, {
          status: taskStatus.get(newStatus),
        })
        .catch((err) => {
          listActions.undoDragAndDrop(result);
        });
    }
  };
  return (
    <TaskListsContainer onDragEnd={onDragEnd}>
      {lists.map(({ status, displayName, tasks, displayOrder }) => {
        return (
          <TaskList
            key={status}
            status={status}
            displayName={displayName}
            tasks={
              displayOrder
                .map((id) => tasks.find((t) => t._id === id) ?? undefined)
                .filter(Boolean) as Task[]
            }
            taskActions={taskActions}
            showDetail={showDetail}
          />
        );
      })}
    </TaskListsContainer>
  );
}

const TaskListsContainer: React.FC<DragDropContextProps> = ({
  onDragEnd,
  children,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        css={css`
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          padding-top: 0px;
        `}
      >
        {children}
      </div>
    </DragDropContext>
  );
};

interface TaskListProps {
  status: TaskStatus;
  displayName: string;
  tasks: Task[];
  taskActions: TaskActions;
  showDetail: (task: Task) => void;
}
export default function TaskList(props: TaskListProps): React.ReactElement {
  const { user } = useRealmApp();
  if(!user) {
    throw new Error("TaskList may only render with a logged in user.")
  }
  const { status, displayName, tasks, taskActions, showDetail } = props;
  const [draft, draftActions] = useDraftTask(user, taskActions);

  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <Layout ref={provided.innerRef} {...provided.droppableProps}>
          <ListContainer>
            <ListTitle>{displayName}</ListTitle>
            {tasks.map((task, i) => (
              <DraggableListItem
                key={task._id}
                id={task._id}
                index={i}
                onClick={() => {
                  showDetail(task);
                }}
              >
                <TaskCard task={task} />
              </DraggableListItem>
            ))}
            {provided.placeholder}
            {draft && (
              <ListItem>
                <DraftTaskCard draft={draft} draftActions={draftActions} />
              </ListItem>
            )}
            {!draft && (
              <ListButton
                onClick={() =>
                  draftActions.createDraft({
                    status,
                    name: "",
                    assignee: user?.id ?? "",
                  })
                }
              >
                + Add Task
              </ListButton>
            )}
          </ListContainer>
        </Layout>
      )}
    </Droppable>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 512px;
  margin: 10px 10px;
`;

const ListTitle = styled.h2`
  margin: 0;
  margin-bottom: 16px;
  font-size: 32px;
  color: ${uiColors.black};
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: ${uiColors.gray.light1};
  border-radius: 4px;
  overflow-y: scroll;
  max-height: 80vh;
  :not(:last-child) {
    margin-bottom: 8px;
  }
`;
const ListItem = styled.div`
  :not(:last-child) {
    margin-bottom: 16px;
  }
`;

interface DraggableListItemProps {
  id: any;
  index: number;
  onClick: () => void;
}

const DraggableListItem: React.FC<DraggableListItemProps> = ({
  id,
  index,
  children,
  onClick,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
        >
          {children}
        </ListItem>
      )}
    </Draggable>
  );
};

const ListButton = styled.button`
  padding: 8px;
  border: none;
  background: ${uiColors.white};
  background: transparent;
  border-radius: 4px;
  font-size: 16px;
  text-align: left;
  font-weight: bold;
  color: ${uiColors.gray.dark2};
  :hover {
    background: ${uiColors.gray.light2};
  }
`;
