import {useUser} from '@realm/react';

const SampleTask = ({_id}) => {
  // Access the logged in user using the useUser hook
  const user = useUser();

  const myTask = useObject(Task, _id);
  return (
    <View>
      <Text>
        The task {myTask?.description} was created by user id: {user?.id}
      </Text>
    </View>
  );
};
