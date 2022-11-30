import styled from "@emotion/styled";
import { css } from "@emotion/core";

const ButtonGroup = styled.div(
  (props) => css`
    display: flex;
    flex-direction: ${props.direction === "row" ? "row" : "column"};
    justify-content: center;
    gap: 8px;
    margin-top: 8px;
  `
);
export default ButtonGroup;
