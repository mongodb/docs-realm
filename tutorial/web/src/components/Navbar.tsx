import * as React from "react";
import styled from "@emotion/styled";
import { useRealmApp } from "../realm/RealmApp";
import Button from "@leafygreen-ui/button";
import { uiColors } from "@leafygreen-ui/palette";

const Navbar: React.FC = () => {
  const { user, logOut } = useRealmApp();
  const profile: Realm.UserProfile | undefined = user?.profile
  const email = profile?.email;
  return (
    <Container>
      <LoggedInUser>{email}</LoggedInUser>
      <Button size="xsmall" onClick={() => logOut()}>
        Logout
      </Button>
    </Container>
  );
};
export default Navbar;

const Container = styled.div`
  width: 100%;
  height: 64px;
  background: ${uiColors.gray.base};
  font-size: 16px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
`;

const LoggedInUser = styled.div`
  padding-bottom: 8px;
`;
