return () => {
  // cleanup function
  const userRealm = realmRef.current;
  if (userRealm) {
    userRealm.close();
    realmRef.current = null;
    setProjectData([]); // set project data to an empty array (this prevents the array from staying in state on logout)
  }
};