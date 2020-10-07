return () => {
  // cleanup function
  const projectRealm = realmRef.current;
  if (projectRealm) {
    projectRealm.close();
    realmRef.current = null;
    setTasks([]);
  }
};