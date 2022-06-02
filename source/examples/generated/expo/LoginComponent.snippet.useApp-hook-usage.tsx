import {useApp} from '@realm/react';

function LoginComponent({}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const app = useApp();

  const signIn = async () => {
    const credentials = Realm.Credentials.emailPassword(email, password);
    await app.logIn(credentials);
  };
  // ...
}
