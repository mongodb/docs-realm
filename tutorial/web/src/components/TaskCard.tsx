import * as React from "react";
import styled from "@emotion/styled";
import { Task } from "../types";
import { DraftTask, DraftTaskActions } from "../hooks/useDraftTask";
import Card from "@leafygreen-ui/card";

import { TaskView, DraftTaskView } from "./TaskView";

interface TaskCardProps {
  task: Task;
}
export default function TaskCard({ task }: TaskCardProps): React.ReactElement {
  return (
    <Card>
      <Layout>
        <TaskView task={task} />
      </Layout>
    </Card>
  );
}

type DraftTaskCardProps = {
  draft: DraftTask;
  draftActions: DraftTaskActions;
};

export function DraftTaskCard({
  draft,
  draftActions,
}: DraftTaskCardProps): React.ReactElement {
  return (
    <Card>
      <Layout>
        <DraftTaskView draft={draft} draftActions={draftActions} />
      </Layout>
    </Card>
  );
}

const Layout = styled.div`
  padding: 8px;
  color: black;
`;
