import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useAuth } from "../providers/AuthProvider";
import styles from "../stylesheet";

export function WelcomeView({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signUp, signIn } = useAuth();

  // the onPressSignIn method calls AuthProvider.signIn with the
  // username/password in state and then navigates to the Projects
  // screen once the user is signed in
  const onPressSignIn = async () => {
    try {
      await signIn(username, password);
      navigation.navigate("Projects");
    } catch (err) {
      throw `an error occurred while signing in ${err}`;
    }
  };

  // the onPressSignUp method calls AuthProvider.signUp with the
  // username/password in state and then calls onPressSignIn once a user
  // is registered
  const onPressSignUp = async () => {
    await signUp(username, password);
    // 1 second timeout to allow for realm to receive the user object,
    // so the next screen can retrieve it via
    // userRealm.objects("User");
    setTimeout(() => {
      onPressSignIn();
    }, 1000);
  };
  return (
    <View>
      <Text>Signup or Signin:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="username"
          style={styles.inputStyle}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="password"
          style={styles.inputStyle}
          secureTextEntry
        />
      </View>
      <Button onPress={onPressSignIn} title="Sign In" />
      <Button onPress={onPressSignUp} title="Sign Up" />
    </View>
  );
}
