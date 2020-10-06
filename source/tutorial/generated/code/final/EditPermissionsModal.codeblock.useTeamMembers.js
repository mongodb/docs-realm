function useTeamMembers() {
  const [teamMembers, setTeamMembers] = React.useState(null);
  const [newUserEmailError, setNewUserEmailError] = React.useState(null);
  const app = useRealmApp();
  const { addTeamMember, removeTeamMember, getMyTeamMembers } = app.functions;
  const updateTeamMembers = async () => {
    const team = await getMyTeamMembers();
    setTeamMembers(team);
  };
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    // display team members on load
    updateTeamMembers();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */
  return {
    teamMembers,
    errorMessage: newUserEmailError,
    addTeamMember: async (email) => {
      const { error } = await addTeamMember(email);
      if (error) {
        setNewUserEmailError(error);
        return { error };
      } else {
        updateTeamMembers();
      }
    },
    removeTeamMember: async (email) => {
      await removeTeamMember(email);
      updateTeamMembers();
    },
  };
}