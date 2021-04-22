class MyClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
    // Use a Ref to store the realm rather than the state because it is not
    // directly rendered, so updating it should not trigger a re-render as using
    // state would.
    this.realm = createRef();
  }

  componentDidMount() {
    Realm.open({
      schema: [TaskSchema], // predefined schema
    }).then(realm => {
      this.realm.current = realm;
      const tasks = realm.objects('Task');
      // set state to the initial value of your realm objects
      this.setState({tasks: [...tasks]});

      tasks.addListener(() => {
        // update state of tasks to the updated value
        this.setState({tasks: [...tasks]});
      });

      realm.write(() => {
        // the following tasks will trigger the change listener and update the UI
        realm.create('Task', {
          name: 'Write essay',
        });
        realm.create('Task', {
          name: 'Do math homework',
        });
      });
    });
  }
  componentWillUnmount() {
    // using the reference to our realm instance, remove the change listener and close the realm
    const realm = this.realm.current;
    if (realm) {
      const tasks = realm.objects('Task');
      console.log(tasks);
      // Remember to remove the listener when you're done!
      tasks.removeAllListeners();
      // // Call the close() method when done with a realm instance to avoid memory leaks.
      realm.close();
    }
  }
  render() {
    const {tasks} = this.state;
    return (
      <>
        {tasks.map(task => (
          <Text key={task.name}>{task.name}</Text>
        ))}
      </>
    );
  }
}