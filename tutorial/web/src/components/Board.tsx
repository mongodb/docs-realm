import * as React from "react";
import styled from "@emotion/styled";
import Navbar from "./Navbar";
import { TaskLists } from "./TaskLists";
import { useTaskDetailView } from "./TaskDetail";
import { useTasks } from "../hooks/useTasks";

const Board: React.FC = () => {
  const { tasks, loading, actions: taskActions } = useTasks();
  const [TaskDetailView, { show }] = useTaskDetailView(tasks);

  return (
    <TaskBoard>
      <Navbar />
      {!loading && (
        <TaskLists tasks={tasks} taskActions={taskActions} showDetail={show} />
      )}
      <TaskDetailView taskActions={taskActions} />
    </TaskBoard>
  );
};
export default Board;

const TaskBoard = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
`;
