import React from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { useRealmApp } from "../RealmApp";
import useProjects from "../graphql/useProjects";
import Card from "./Card";
import { uiColors } from "@leafygreen-ui/palette";

export default function Sidebar({
  currentProject,
  setCurrentProject,
  setIsEditingPermissions,
}) {
  const projects = useProjects();
  const app = useRealmApp();

  return (
    <SidebarContainer>
      <Card>
        <SectionHeading>Projects</SectionHeading>
        <SectionList>
          {projects.map((project) => (
            <SectionListItem
              key={project.partition}
              onClick={() => setCurrentProject(project)}
              isSelected={project.partition === currentProject?.partition}
            >
              {project.name}
            </SectionListItem>
          ))}
        </SectionList>
        <UserDetails
          user={app.currentUser}
          handleLogout={() => {
            app.logOut();
          }}
          handleEditPermissions={() => {
            setIsEditingPermissions(true);
          }}
        />
      </Card>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  display: flex;
  background: ${uiColors.gray.light2};
  flex-direction: column;
  padding: 40px;
`;

const SectionHeading = styled.h2`
  margin: 0;
  padding: 8px;
`;
const SectionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const SectionListItem = styled.li(
  (props) => css`
    padding: 8px 12px;
    border-radius: 8px;
    background: ${props.isSelected && uiColors.green.light2};
    :hover {
      background: ${!props.isSelected && uiColors.gray.light1};
    }
  `
);

function UserDetails({ user, handleLogout, handleEditPermissions }) {
  return (
    <UserDetailsContainer>
      <Username>{user.profile.email}</Username>
      <TextButton onClick={handleEditPermissions}>Manage My Project</TextButton>
      <TextButton onClick={handleLogout}>Log Out</TextButton>
    </UserDetailsContainer>
  );
}

const UserDetailsContainer = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
`;

const Username = styled.div`
  font-weight: bold;
  text-align: center;
  margin-bottom: 4px;
`;

const TextButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  color: #069;
  text-decoration: none;
  cursor: pointer;
  color: ${uiColors.green.dark2};
`;
