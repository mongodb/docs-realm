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