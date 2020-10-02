import React from "react";
import { uiColors } from "@leafygreen-ui/palette";
import GridLoader from "react-spinners/GridLoader";

export default function Loading() {
  return <GridLoader size="15px" margin="3px" color={uiColors.gray.dark2} />;
}
