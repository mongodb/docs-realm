// Connect & Authenticate with an App Services App
function LogIn() {
    const app = useApp();
  
    useEffect(() => {
      app.logIn(Realm.Credentials.anonymous());
    }, []);
  
    return <></>;
}
