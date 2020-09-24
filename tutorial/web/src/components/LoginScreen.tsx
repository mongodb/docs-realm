import * as React from "react";
import { useRealmApp } from "../realm/RealmApp";

import styled from "@emotion/styled";
import Button from "@leafygreen-ui/button";
import TextInput from "@leafygreen-ui/text-input";
import Card from "@leafygreen-ui/card";
import { uiColors } from "@leafygreen-ui/palette";
import validator from "validator";

const LoginScreen: React.FC = () => {
  const app = useRealmApp();

  // Toggle between logging users in and registering new users
  const [mode, setMode] = React.useState<"login" | "register">("login");
  const toggleMode = () => {
    setMode((oldMode) => (oldMode === "login" ? "register" : "login"));
  };

  // Keep track of form input state
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  // Whenever the mode changes, clear the form inputs
  React.useEffect(() => {
    setEmail("");
    setPassword("");
    setError({});
  }, [mode]);
  // Keep track of input validation/errors
  const [error, setError] = React.useState<{
    email?: string;
    password?: string;
  }>({});

  function handleAuthenticationError(err: Error) {
    console.error(err);
    const { status, message } = parseAuthenticationError(err);
    const errorType = message || status;
    switch (errorType) {
      case "invalid username":
        setError((prevErr) => ({ ...prevErr, email: "Invalid email address." }));
        break;
      case "invalid username/password":
      case "invalid password":
      case "401":
        setError((err) => ({ ...err, password: "Incorrect password." }));
        break;
      case "name already in use":
      case "409":
        setError((err) => ({ ...err, email: "Email is already registered." }));
        break;
      case "password must be between 6 and 128 characters":
      case "400":
        setError((err) => ({
          ...err,
          password: "Password must be between 6 and 128 characters.",
        }));
        break;
    }
  }

  const handleLogin = async () => {
    setError((e) => ({ ...e, password: undefined }));
    try {
      return await app.logIn(email, password);
    } catch (err) {
      handleAuthenticationError(err);
    }
  };

  const handleRegistrationAndLogin = async () => {
    const isValidEmailAddress = validator.isEmail(email);
    setError((e) => ({ ...e, password: undefined }));
    if (isValidEmailAddress) {
      try {
        // Register the user and, if successful, log them in
        await app.registerUser(email, password);
        return await handleLogin();
      } catch (err) {
        handleAuthenticationError(err);
      }
    } else {
      setError((err) => ({ ...err, email: "Email is invalid." }));
    }
  };

  return (
    <Container>
      <Card>
        <Layout>
          <LoginFormRow>
            <LoginHeading>
              {mode === "login" ? "Log In" : "Register an Account"}
            </LoginHeading>
          </LoginFormRow>
          <LoginFormRow>
            <TextInput
              type="email"
              label="Email"
              placeholder="your.email@example.com"
              onChange={(e) => {
                setError((e) => ({ ...e, email: undefined }));
                setEmail(e.target.value);
              }}
              value={email}
              state={
                error.email
                  ? "error"
                  : validator.isEmail(email)
                  ? "valid"
                  : "none"
              }
              errorMessage={error.email}
            />
          </LoginFormRow>
          <LoginFormRow>
            <TextInput
              type="password"
              label="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              state={
                error.password ? "error" : error.password ? "valid" : "none"
              }
              errorMessage={error.password}
            />
          </LoginFormRow>
          {mode === "login" ? (
            <Button variant="primary" onClick={() => handleLogin()}>
              Log In
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => handleRegistrationAndLogin()}
            >
              Register
            </Button>
          )}
          <ToggleContainer>
            <ToggleText>
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </ToggleText>
            <ToggleLink
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                toggleMode();
              }}
            >
              {mode === "login" ? "Register one now." : "Log in instead."}
            </ToggleLink>
          </ToggleContainer>
        </Layout>
      </Card>
    </Container>
  );
};
export default LoginScreen;

function parseAuthenticationError(err: Error) {
  const parts = err.message.split(":");
  const reason = parts[parts.length - 1].trimStart();
  if (!reason) return { status: "", message: "" };
  const reasonRegex = /(?<message>.+)\s\(status (?<status>[0-9][0-9][0-9])/;
  const match = reason.match(reasonRegex);
  const { status, message } = match?.groups ?? {};
  return { status, message };
}

const ToggleContainer = styled.div`
  margin-top: 8px;
  font-size: 12px;
  display: flex;
  justify-content: center;
`;

const ToggleText = styled.span`
  line-height: 18px;
`;

const ToggleLink = styled.button`
  background: none;
  border: none;
  font-size: 12px;
  color: ${uiColors.green.dark2};
`;

const Container = styled.div`
  height: 100vh;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const Layout = styled.div`
  padding: 8px;
  color: black;
  width: 400px;
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const LoginHeading = styled.h1`
  margin: 0;
  font-size: 32px;
`;

const LoginFormRow = styled.div`
  margin-bottom: 16px;
`;
