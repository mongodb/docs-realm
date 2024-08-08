import { useState } from "react";
import { useAuth, useEmailPasswordAuth } from "@realm/react";

export const LoginPage = () => {
  const { logInWithAnonymous } = useAuth();
  const { logIn, register } = useEmailPasswordAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAnonymous = () => {
    logInWithAnonymous();
  };

  const loginEmailPassword = () => {
    logIn({ email, password });
  };

  const registerUser = () => {
    register({ email, password });

    setTimeout(() => {
      loginEmailPassword();
    }, 500);
  };

  return (
    <div>
      <div>
        <p>Create a new account or log into an existing account</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email..."
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password..."
        />

        <div>
          <button onClick={registerUser}>Create account</button>
          <button onClick={loginEmailPassword}>Log in</button>
        </div>
      </div>

      <div>
        <p>
          Log in to continue. The button below will log you in with an anonymous
          App Services user.
        </p>
        <button onClick={loginAnonymous}>Log in</button>
      </div>
    </div>
  );
};
