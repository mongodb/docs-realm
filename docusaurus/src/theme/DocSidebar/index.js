import React from "react";
import DocSidebar from "@theme-original/DocSidebar";
import VersionChanger from "../../components/VersionChanger";

export default function DocSidebarWrapper(props) {
  return (
    <>
      <VersionChanger />
      <DocSidebar {...props} />
    </>
  );
}
