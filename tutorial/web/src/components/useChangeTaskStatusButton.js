import React from "react";
import styled from "@emotion/styled";
import LGButton from "@leafygreen-ui/button";
import StatusChange from "./StatusChange";
import useTaskMutations from "../graphql/useTaskMutations";

// Use a hook to dynamically create status update buttons for the specified project
export default function useChangeTaskStatusButton(project) {
  const { updateTask } = useTaskMutations(project);
  const ChangeTaskStatusButton = ({ task, fromStatus, toStatus, children }) => {
    return (
      <Button onClick={() => updateTask(task, { status: toStatus })}>
        <ButtonContent>
          {children}
          <StatusChange from={fromStatus} to={toStatus} />
        </ButtonContent>
      </Button>
    );
  };
  return ChangeTaskStatusButton;
}

const Button = styled(LGButton)`
  height: 100%;
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;
  gap: 8px;
`;
