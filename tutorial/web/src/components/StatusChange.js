import React from "react";
import styled from "@emotion/styled";
import StatusBadge from "./StatusBadge";
import ArrowRightIcon from "@leafygreen-ui/icon/dist/ArrowRight";

export default function StatusChange({ from, to }) {
  return (
    <Container>
      <StatusBadge status={from} />
      <ArrowRightIcon />
      <StatusBadge status={to} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
