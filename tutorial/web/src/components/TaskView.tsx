import * as React from "react";
import styled from "@emotion/styled";
import { Task, User } from "../types";
import { TaskStatus } from "../hooks/useTasks";
import { DraftTask, DraftTaskActions } from "../hooks/useDraftTask";
import Button from "@leafygreen-ui/button";
import TextInput from "@leafygreen-ui/text-input";
import { uiColors } from "@leafygreen-ui/palette";

interface TaskViewProps {
  task: Task;
}

export function TaskView({ task }: TaskViewProps) {
  const { assignee, name } = task;
  const status = task.status as TaskStatus;
  const statusColor = statusColors.get(status);
  const statusMessage = statusMessages.get(status);
  return (
    <>
      <Row>
        <Assignee user={assignee} />
        <Status
          backgroundColor={statusColor?.background}
          textColor={statusColor?.text}
        >
          {statusMessage}
        </Status>
      </Row>
      <Row>
        <Name>
          <span>{name}</span>
        </Name>
      </Row>
    </>
  );
}

type DraftTaskViewProps = {
  draft: DraftTask;
  draftActions: DraftTaskActions;
};

export function DraftTaskView({
  draft,
  draftActions,
}: DraftTaskViewProps): React.ReactElement {
  const { status, name } = draft;
  const { updateDraft, deleteDraft, saveDraft } = draftActions;
  const statusColor = statusColors.get(status);
  const statusMessage = statusMessages.get(status);

  return (
    <>
      <Row>
        <Status
          backgroundColor={statusColor?.background}
          textColor={statusColor?.text}
        >
          {statusMessage}
        </Status>
      </Row>
      <Row>
        <DraftInput
          placeholder="Enter a task..."
          onChange={(e) => {
            updateDraft({
              ...draft,
              name: e.target.value,
            });
          }}
          value={name}
        />
      </Row>
      <Row>
        <DeleteButton
          onClick={() => {
            deleteDraft();
          }}
        >
          Delete
        </DeleteButton>
        <SubmitButton
          onClick={async () => {
            await saveDraft();
          }}
          disabled={!draft.name}
        >
          Add
        </SubmitButton>
      </Row>
    </>
  );
}

const statusMessages = new Map<TaskStatus, string>([
  [TaskStatus.Open, "Open"],
  [TaskStatus.Inprogress, "In Progress"],
  [TaskStatus.Complete, "Complete"],
]);

type StatusColor = { background: string; text: string };

const statusColors = new Map<TaskStatus, StatusColor>([
  [
    TaskStatus.Open,
    { background: uiColors.blue.base, text: uiColors.gray.light3 },
  ],
  [
    TaskStatus.Inprogress,
    { background: uiColors.yellow.base, text: uiColors.gray.dark2 },
  ],
  [
    TaskStatus.Complete,
    { background: uiColors.green.base, text: uiColors.gray.light3 },
  ],
]);

const DraftInput = styled(TextInput)`
  width: 100%;
`;

interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
}

const SubmitButton: React.FC<ButtonProps> = (props) => (
  <Button variant="primary" {...props}>
    Add
  </Button>
);

const DeleteButton: React.FC<ButtonProps> = (props) => (
  <Button variant="danger" {...props}>
    Delete
  </Button>
);

interface AssigneeProps {
  user?: User | null;
}

function Assignee({ user }: AssigneeProps) {
  const image = user?.image || "./no-avatar.png";
  const username = user?.name || "No assignee";
  return (
    <AssigneeContainer>
      <Avatar src={image} />
      <Username>{username}</Username>
    </AssigneeContainer>
  );
}
const AssigneeContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 16px;
  border-radius: 500px;
  border: 0.5px solid transparent;
`;

const Username = styled.div`
  font-size: 16px;
`;

const Avatar = styled.div<{ src: string }>(
  (props) => `
    background-image: url('${props.src}');
    /* make a square container */
    width: 24px;
    height: 24px;
    /* fill the container, preserving aspect ratio, and cropping to fit */
    background-size: cover;
    /* center the image vertically and horizontally */
    background-position: top center;
    /* round the edges to a circle with border radius 1/2 container size */
    border-radius: 50%;
    margin-right: 8px;
`
);

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Name = styled.div`
  font-size: 24px;
  margin: 0;
  text-align: left;
`;

const Status = styled.div<{
  backgroundColor?: string;
  textColor?: string;
}>(
  (props) => `
  font-size: 12px;
  font-weight: bold;
  line-height: 12px;
  text-align: center;
  border-radius: 500px;
  background-color: ${props.backgroundColor || "lightgray"};
  padding: 8px 12px;
  margin-left: auto;
  color: ${props.textColor || "black"};
  user-select: none;
`
);
