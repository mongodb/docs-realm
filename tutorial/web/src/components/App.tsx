import React from "react";
import styled from "@emotion/styled";
import RealmApp, { useRealmApp } from "../realm/RealmApp";
import RealmApolloProvider from "../realm/RealmApolloProvider";
import LoginScreen from "./LoginScreen";
import Board from "./Board";

const App: React.FC = (props) => {
  return (
    <RealmApp>
      <AppContainer>
        <RequireAuthentication />
      </AppContainer>
    </RealmApp>
  );
};
export default App;

const AppContainer = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

function RequireAuthentication() {
  const app = useRealmApp();
  if (!app) {
    return <div>Loading</div>;
  }
  return app.user ? (
    <RealmApolloProvider>
      <Board />
    </RealmApolloProvider>
  ) : (
    <LoginScreen />
  );
}
